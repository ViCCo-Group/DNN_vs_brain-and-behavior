"""
Skript: update Table of DNN vs brain and behavior
Input: csv table 
Outout: html code
coded by Anna Wolff 
"""

import pandas as pd
import argparse 

parser = argparse.ArgumentParser(description='Convert CSV file to HTML table')
parser.add_argument('--csv_file', help='Path to the CSV file', required=True)
args = vars(parser.parse_args())

columns = ['Title','Authors','Year','Journal','DOI','arXiv-ID','Keywords']
df = pd.read_csv(args['csv_file'], sep='\t', names=columns , encoding='utf-8')
# encoding='iso-8859-1' or encoding='cp1252' 
# best encoding='cp1252', but not for all csv !! Problem with google sheet [encoding='latin-1' works]
df = df.fillna('') #nan row will be empty now

# loop to create link in dataframe for DOI
df_new_DOI = []
for i in df['DOI']:
    if i == 'DOI':
        link = "DOI"
        df_new_DOI.append(link)  
        continue
    if i == '':
        link = ""
        df_new_DOI.append(link)  
        continue
    else:
        link = ' <a href="https://dx.doi.org/' + str(i) + '"' +' target= "_blank">' + str(i) + '</a '
        df_new_DOI.append(link)  
     
     
# loop to create link in dataframe for arXiv-ID
df_new_ar = []
for i in df['arXiv-ID']:
    if i == 'arXiv-ID':
        link = "arXiv-ID"
        df_new_ar.append(link)  
        continue
    if i == '':
        link = ""
        df_new_ar.append(link)  
        continue
    else:
        link = ' <a href="http://arxiv.org/abs/' + str(i) + '"' + ' target= "_blank">' + str(i) + '</a '
        df_new_ar.append(link)      

# update dataframe with two linked versions
df['DOI'] = df_new_DOI
df['arXiv-ID'] = df_new_ar

# comibine these two colums
df['Link'] = df['DOI'] + df['arXiv-ID']
# create nice table with only needed columns
df = df[['Title','Authors','Year','Journal','Link','Keywords']]

# delet frist row / header
df.drop(index=df.index[0], 
        axis=0, 
        inplace=True)
# finally all to html
df_html = df.to_html(escape=False, header=True,index=False) 
# escape to keep the symbols in links, delete index-column

#complete html, change some paragraphs (easier as a list) and needed script for freezedheader
s=list(df_html)

s[17]='<table ' # javacript need "class" here 
s[25:34] = 'sortable' # change class="dataframe" to class=sortable
s[53:81] = '>' # remove <tr style="text-align: right;"> to simple needed <tr>

Intro = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta name="charset" content="UTF-8">
<meta name="author" content="ViCCo Group i.A. Anna Wolff">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="DNN vs. brain and behavior">
<title>DNN vs. brain_behavior </title>
  <link rel="stylesheet" type="text/css" href="sortable.css" />
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <link rel="stylesheet" type="text/css" href="buttons.css" />
</head>
<body>

<div class="container">
    <h1 style="text-align: center;">DNN vs. brain and behavior</h1>
</div>
  
        <div class="Intro">
   <p style="text-align:center;">Would like to add new papers or update existing ones? Click<a href="https://docs.google.com/spreadsheets/d/1Dgbqh19xYWZ8MSJwEOu9XSaZzCWD-DbmL7oq395-prk/edit?usp=sharing"_blank"> here.</a> We will update the website regulary. </p>
   <p style="text-align:center;">This list is the updated (but surely not complete!) literature collection by <a href="https://twitter.com/AnnaWol45981764"target= "_blank">Anna Wolff </a> and <a href="https://twitter.com/martin_hebart"target= "_blank">Martin Hebart</a> (<a href="https://hebartlab.com/"target= "_blank">ViCCo Group</a>). </p> 
        </div>
     
<div id='filter_section' >
     <button id='reset_filter'>Reset</button></br>
</div>
  
<p><div id="table">\n"""

s[0:17] = Intro #Introduction and needed code for sortable
 
s[-1:] = '>\n</div>\n\n<script type="text/javascript" src="sortable.js"></script>\n<script type="text/javascript" src="filter.js"></script>\n\n</body>\n\n</html>\n'
# commentary to end and function javascript
# s[610:785] = ' ' # remove the row of titles ("Title, Authors etc") -> other way with df.drop
# list back to str to copy more easily
html_final = ''.join(s)

# final version to copy and enter in GitHub - thanks for updating!
# ---> html_final <---

with open('../index.html', 'w') as o_file:
	o_file.write(html_final)

