import pickle 
import sys

if __name__ == '__main__':
    # pkl_path = sys.argv[1]
    # output_path = sys.argv[2]
    # segment_size = int(sys.argv[3])
    pkl_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/train.pkl'
    output_path = 'C:/Users/rohan/Desktop/OneshotVoiceConversionProject/adaptive_voice_conversion-master/DATA/train_$segment_size.pkl'
    segment_size = 128

    with open(pkl_path, 'rb') as f:
        data = pickle.load(f)

    reduced_data = {key:val for key, val in data.items() if val.shape[0] > segment_size}

    with open(output_path, 'wb') as f:
        pickle.dump(reduced_data, f)
