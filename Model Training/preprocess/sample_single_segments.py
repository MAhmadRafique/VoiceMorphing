import json 
import pickle 
import sys
import os
import random

if __name__ == '__main__':
    # pickle_path = sys.argv[1]
    # sample_path = sys.argv[2]
    # n_samples = int(sys.argv[3])
    # segment_size = int(sys.argv[4])
    
    # pickle_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/train.pkl'
    # sample_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/train_samples_$segment_size.json'
    # n_samples = 1000000
    # segment_size = 128
    
    # pickle_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/in_test.pkl'
    # sample_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/in_test_samples_$segment_size.json'
    # n_samples = 10000
    # segment_size = 128

    
    pickle_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/out_test.pkl'
    sample_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/out_test_samples_$segment_size.json'
    n_samples = 10000
    segment_size = 128

    with open(pickle_path, 'rb') as f:
        data = pickle.load(f)

    # (utt_id, timestep, neg_utt_id, neg_timestep)
    samples = []

    # filter length > segment_size
    utt_list = [key for key in data]
    utt_list = sorted(list(filter(lambda u : len(data[u]) > segment_size, utt_list)))
    print(f'{len(utt_list)} utterances')
    sample_utt_index_list = random.choices(range(len(utt_list)), k=n_samples)

    for i, utt_ind in enumerate(sample_utt_index_list):
        if i % 500 == 0:
            print(f'sample {i} samples')
        utt_id = utt_list[utt_ind]
        t = random.randint(0, len(data[utt_id]) - segment_size)
        samples.append((utt_id, t))

    with open(sample_path, 'w') as f:
        json.dump(samples, f)

