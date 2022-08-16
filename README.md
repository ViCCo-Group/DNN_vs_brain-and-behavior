# DNN vs. brain and behavior
This list is the updated  (but surely not complete!) version of Martin Hebarts well-known introductory [list](https://docs.google.com/document/d/1qil2ylAnw6XrHPymYjKKYNDJn2qZQYA_Qg2_ijl-MaQ/edit#heading=h.oj7nw2h2lp7j) for DNN vs. brain and behavior.

SORTABLE TABLE: https://vicco-group.github.io/DNN_vs_brain-and-behavior/ 
(possible by lables AND sort alphabetically by header)


Keywords: behavior, brain_imaging, review, human, rodent, monkey, eeg, electrophysiology, fMRI, MEG, visual, semantic


If you wish to add a new paper, please add it [here](https://docs.google.com/spreadsheets/d/1Dgbqh19xYWZ8MSJwEOu9XSaZzCWD-DbmL7oq395-prk/edit?usp=sharing) and we will update the website regulary. For updates, follow on Twitter: [@martin_hebart](https://twitter.com/martin_hebart) [ViCCo Group](https://hebartlab.com/)


# How to update the list?
The script is written in Python3.

1. First install the requirements.
```
pip install -r requirements.txt
```

2. Check [here](https://docs.google.com/spreadsheets/d/1Dgbqh19xYWZ8MSJwEOu9XSaZzCWD-DbmL7oq395-prk/edit?usp=sharing) whether there are any modifications. If yes, copy them over to the main spreadsheet.

3. Download the main spreadsheet as a tab (not comma!) separated CSV file. 

4. Run the script in `scripts/csv_to_html_table.py` with the following command. It takes the path to the CSV file from step 3. It is important to run the script in the `scripts` directory as the output HTML file(index.html) be placed directly in the parent directory.
```
cd scripts
python csv_to_html_table.py --csv_file=[spreadsheet.csv]
``` 
