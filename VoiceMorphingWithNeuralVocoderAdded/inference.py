import os
import json
from argparse import ArgumentParser

import yaml
import numpy as np
import torch
import torch.nn.functional as F
from scipy.io.wavfile import write

from model import AE
from vocoder.model import Vocoder
from vocoder.utils import load_wav, save_wav, melspectrogram
from utils import cc
import noisereduce as nr
from scipy.io import wavfile
from pydub import AudioSegment

import matplotlib.pyplot as pp

from resemblyzer import VoiceEncoder, preprocess_wav
from pathlib import Path

class Inferencer(object):
    def __init__(self, config, args):
        # model hyperparameters
        self.config = config

        # other information
        self.args = args
        
        # build model and load weights
        self.model = cc(AE(self.config))
        self.model.eval()
        model_path = os.path.join(self.args.model_path, 'model.ckpt')
        self.model.load_state_dict(torch.load(model_path))

        # prepare vocoder
        with open(os.path.join(args.vocoder_path, 'config.json')) as f:
            params = json.load(f)
        self.params = params
        self.vocoder = Vocoder(sample_rate=params["preprocessing"]["sample_rate"],
                               frames_per_sample=params["vocoder"]["sample_frames"],
                               frames_per_slice=params["vocoder"]["audio_slice_frames"],
                               mel_channels=params["preprocessing"]["num_mels"],
                               conditioning_channels=params["vocoder"]["conditioning_channels"],
                               embedding_dim=params["vocoder"]["embedding_dim"],
                               rnn_channels=params["vocoder"]["rnn_channels"],
                               fc_channels=params["vocoder"]["fc_channels"],
                               bits=params["preprocessing"]["bits"],
                               hop_length=params["preprocessing"]["hop_length"])
        self.vocoder = cc(self.vocoder)
        ckpt_path = os.path.join(args.vocoder_path, 'model.ckpt-100000.pt')
        ckpt = torch.load(ckpt_path, map_location=lambda storage, loc: storage)
        self.vocoder.load_state_dict(ckpt["model"])

    def utt_make_frames(self, x):
        frame_size = self.config['data_loader']['frame_size']
        remains = x.size(0) % frame_size
        if remains != 0:
            x = F.pad(x, (0, remains))
        out = x.view(1, x.size(0) // frame_size, frame_size * x.size(1)).transpose(1, 2)
        return out

    def inference_one_utterance(self, x, x_cond):
        x = self.utt_make_frames(x)
        x_cond = self.utt_make_frames(x_cond)
        dec = self.model.inference(x, x_cond)
        dec = dec.transpose(1, 2)
        dec = dec.detach()
        with torch.no_grad():
            wav_data = self.vocoder.generate([dec.squeeze(0)])[0]
            wav_data = wav_data.cpu().numpy()
        return wav_data, dec

    def get_spectrograms(self, file_name):
        wav = load_wav(file_name, self.params['preprocessing']['sample_rate'])
        wav = wav / np.abs(wav).max() * 0.999
        mel = melspectrogram(wav,
                             sample_rate=self.params["preprocessing"]["sample_rate"],
                             preemph=self.params["preprocessing"]["preemph"],
                             num_mels=self.params["preprocessing"]["num_mels"],
                             num_fft=self.params["preprocessing"]["num_fft"],
                             min_level_db=self.params["preprocessing"]["min_level_db"],
                             hop_length=self.params["preprocessing"]["hop_length"],
                             win_length=self.params["preprocessing"]["win_length"],
                             fmin=self.params["preprocessing"]["fmin"])
        mel = cc(torch.FloatTensor(mel))
        return mel

    def write_wav_to_file(self, wav_data, output_path):
        write(output_path, rate=self.args.sample_rate, data=wav_data)

    def inference_from_path(self):
        src_mel = self.get_spectrograms("reduced-noise-source.wav")
        tar_mel = self.get_spectrograms("reduced-noise-target.wav")
        
        # src_mel = self.get_spectrograms(self.args.source)
        # tar_mel = self.get_spectrograms(self.args.target)
        cvt_wav, _ = self.inference_one_utterance(src_mel, tar_mel)
        save_wav(self.args.output, cvt_wav, self.params['preprocessing']['sample_rate'])

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--model_path', '-m', default='C:\Git\VoiceMorphing\VoiceMorphingWithNeuralVocoderAdded')
    parser.add_argument('--source', '-s', default='Target.wav')
    parser.add_argument('--target', '-t', default='t2.wav')
    parser.add_argument('--output','-o', default='output.wav')
    parser.add_argument('--vocoder_path', '-v', type=str, help='vocoder path', default='vocoder')
    args = parser.parse_args()
    
    sound = AudioSegment.from_wav(args.source)
    sound = sound.set_channels(1)
    sound.export(args.source, format="wav")
  
    
    sound = AudioSegment.from_wav(args.target)
    sound = sound.set_channels(1)
    sound.export(args.target , format="wav")
  
    
    rate1, data1 = wavfile.read(args.source)
    rate2, data2 = wavfile.read(args.target)
    rate3, noisy_part = wavfile.read("SampleNoise.wav")


    data1 = data1/1.0
    data2 = data2/1.0
    noisy_part = noisy_part/1.0
    
    
     
    reduced_noise1 = nr.reduce_noise(audio_clip=data1, noise_clip=noisy_part, verbose=True)
    
    write("reduced-noise-source.wav", rate1, data1.astype(np.int16))

    reduced_noise2 = nr.reduce_noise(audio_clip=data2, noise_clip=noisy_part, verbose=True)
    write("reduced-noise-target.wav", rate2, data2.astype(np.int16))

    map_location=torch.device('cpu')

    # load config file
    with open(os.path.join(args.model_path, 'config.yaml')) as f:
        config = yaml.load(f, Loader=yaml.FullLoader)
    inferencer = Inferencer(config=config, args=args)
    inferencer.inference_from_path()
    
    

