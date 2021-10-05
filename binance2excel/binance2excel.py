import xlsxwriter as xl
import pandas as pd

def binance2excel(binance_data):
    writer = pd.ExcelWriter("kripto.xlsx", engine='xlsxwriter')
    
    for d in binance_data:
        
        df = pd.DataFrame(d['data'])

        df.to_excel(writer, sheet_name=f"{d['base']}", startrow=10, startcol=2, header=False, index=False)

        workbook = writer.book
        worksheet = writer.sheets[f"{d['base']}"]

        green_format = workbook.add_format({'bg_color': '#7FFF94',
                                    'font_color': '#42824B'})

        red_format = workbook.add_format({'bg_color': '#FF9999',
                                    'font_color': '#FF0000'})

        text = f"{d['base']} TABANLI KRİPTO VARLIK ALIM-SATIM DURUMU"

        options = {
            'width': 661,
            'height': 52,
            'font': {
                'color': 'black',
                'size': 18,
                'bold': True
            },
            'align': {
                'vertical': 'middle',
                'horizontal': 'center'
            },
            'line': {
                'color': 'green',
                'width': 2
            }
        }

        worksheet.insert_textbox('C2', text, options)

        (max_row, max_col) = df.shape

        column_settings = []
        for header in df.columns:
            column_settings.append({
                'header': header
            })

        worksheet.add_table(9, 2, max_row+9, max_col + 1, {
            'columns': column_settings
        })

        worksheet.set_column(2, max_col + 2, 15)
        worksheet.set_default_row(20)

        worksheet.conditional_format(9, max_col, max_row+9, max_col + 1, {'type': 'cell',
                                            'criteria': 'less than or equal to',
                                            'value': 0,
                                            'format': red_format})

        worksheet.conditional_format(9, max_col, max_row+9, max_col + 1, {'type': 'cell',
                                            'criteria': 'greater than',
                                            'value': 0,
                                            'format': green_format})


        buy = [i for i in d['buy'] if i]
        sell = [i for i in d['sell'] if i]

        worksheet.write(4, 2, 'Toplam Alış')
        worksheet.write(4, 3, sum(buy))

        worksheet.write(5, 2, 'Toplam Satış')
        worksheet.write(5, 3, sum(sell))
        
        worksheet.write(6, 2, 'Kar/Zarar')
        worksheet.write(6, 3, sum(buy) - sum(sell))

    writer.save()
