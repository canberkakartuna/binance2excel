import pandas as pd
from binance2excel import binance2excel
from utils import *

def main(file):

    df = pd.read_csv(file)
    
    dframe = pd.DataFrame({
        'Executed_Pair':create_data(df, 4),
        'Amount_Pair':create_data(df, 5),
        'Fee_Pair':create_data(df, 6)
    })

    bigdata = pd.concat([df, dframe], axis=1)

    bigdata = bigdata.replace(',','', regex=True)

    bigdata[['Price', 'Amount', 'Executed', 'Fee']] = \
        bigdata[['Price', 'Amount', 'Executed', 'Fee']].astype(float)


    coin_names = sorted(set(bigdata["Executed_Pair"]))
    base_names = sorted(set(bigdata["Amount_Pair"]))

    all_binance_data = []

    for base in base_names:
        coin_buy = []
        coin_sell = []
        profit_loss_ratio = []
        profit_ratio = []
        removed_index = []

        for ind, coin in enumerate(coin_names):
            coin_data = bigdata.loc[bigdata["Executed_Pair"] == coin]
            coin_data = coin_data.loc[coin_data["Amount_Pair"] == base]

            total = coin_data.groupby(['Side'])['Amount'].sum()
            if len(total.index) == 2:
                coin_buy.append(total["BUY"])
                coin_sell.append(total["SELL"])
                profit_loss_ratio.append(total["SELL"] - total["BUY"])
                profit_ratio.append(((total["SELL"] - total["BUY"]) / total["BUY"]) * 100)
            elif len(total.index) == 1:
                if total.index[0] == "BUY":
                    coin_buy.append(total["BUY"])
                    coin_sell.append(None)
                    profit_loss_ratio.append(total["BUY"])
                    profit_ratio.append(1)
                else:
                    coin_buy.append(None)
                    coin_sell.append(total["SELL"])
                    profit_loss_ratio.append(-total["SELL"])
                    profit_ratio.append(None)
            else:
                removed_index.append(ind)

        
        base_coin_names = [i for j, i in enumerate(coin_names) if j not in removed_index]
        base_seq = [x for x in range(1,len(base_coin_names)+1)]

        profit_r  = [round(x, 2) if x else x for x in profit_ratio]

        binance_data = {
            'Sıra No': base_seq,
            'Coin Adı': base_coin_names,
            'Toplam Alış': coin_buy,
            'Toplam Satış': coin_sell,
            'Kar/Zarar': profit_loss_ratio,
            'Kar Oranı': profit_r
        }

        all_binance_data.append({
            'data': binance_data,
            'buy': coin_buy,
            'sell': coin_sell,
            'base': base
        })


    binance2excel(all_binance_data)