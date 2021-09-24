import string

def ispunct(ch):
    return ch in string.punctuation

def create_data(df, col_id):
    data = []
    for i in range(0,len(df.iloc[:,col_id])):
        pair = ""
        for c in df.iloc[i, col_id]:
            if not(c.isdigit() or ispunct(c)):
                pair += c
        data.append(pair)
        df.iloc[i, col_id] = df.iloc[i, col_id].replace(pair, '')
    return data