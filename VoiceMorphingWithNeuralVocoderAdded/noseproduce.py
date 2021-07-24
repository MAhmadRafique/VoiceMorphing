import noisereduce as nr
import IPython
from scipy.io import wavfile
import scipy.signal
import numpy as np
import matplotlib.pyplot as plt
import librosa
from scipy.io.wavfile import write

    
rate1, data1 = wavfile.read("target.wav")
rate3, noisy_part = wavfile.read("SampleNoise.wav")
# data1.astype(float)
# data2.astype(float)
# noisy_part.astype(float)
# print(rate1)
data1 = data1/1.0
noisy_part = noisy_part/1.0
# reduced_noise1 = nr.reduce_noise(audio_clip=data1, noise_clip=noisy_part, verbose=True)
data1 = data1+noisy_part
write("noise-source.wav", rate1, data1.astype(np.int16))
