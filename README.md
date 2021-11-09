# <ins>Mini-Web-Apps</ins>
# A. Cric-Info Extractor
## Description
This web app extracts information of matches from the website [CricInfo](https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results) and then creates a folder for each team with pdfs for every match played by the respective team.

We receive the HTML and get the appropriate JSON data required for creating folders and pdfs. After JSON from the website we create our JSON with keeping teams as the main object and from there, we create files and then pdfs (using the [template.pdf](https://github.com/blank0826/Mini-Web-Apps/blob/master/Cric-Info%20Extractor/Template.pdf)) that hold the record of the match.

Created using **JavaScript**

## Screenshots
### <ins>Folders of Each Team</ins>
<img src="https://user-images.githubusercontent.com/33955028/140860482-52f9ce83-f958-49bd-8926-62ec9bb2af1c.png" width="550" height="250">

### <ins>PDF for Each Match for Respective Team</ins>
<img src="https://user-images.githubusercontent.com/33955028/140860697-bbcf1880-b309-4feb-a53c-aaff4543e29a.png" width="600" height="250">

*(Data shown are the matches played by Team INDIA)*

### <ins>PDF for Match IND V/S AFG</ins>
<img src="https://user-images.githubusercontent.com/33955028/140863355-be499d91-e3ec-4b37-98cb-8f068dd22eb2.png" width="500" height="250">

## Local Setup
### <ins>Pre-requisites</ins>
An IDE with support of JSON, HTML.

### <ins>Execution</ins>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1. Pull the code and open it on your IDE.<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. In the terminal, add 

```
npm init
```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This will get all your required modules.<br />

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3. Run [Main.js](https://github.com/blank0826/Mini-Web-Apps/blob/master/Cric-Info%20Extractor/Main.js) and it will create the folders and PDFs in the directory where current program is saved.

# B. Hackerrank Automation
## Description
This web app is automated to add moderators to your competition using **puppeteer**. This logs into your Hackerrank account and will add a moderator to all the competitions created by you.

Created using **JavaScript**

## Local Setup
### <ins>Pre-requisites</ins>
An IDE with support of JSON, HTML.

### <ins>Execution</ins>
1. Pull the code and open it on your IDE.<br />

2. In the terminal, write
```
npm init
```

   This will get all your required modules.<br />

3. In the config.json enter your own details in the form
```
{
    "userid": "youremail@example.com",
    "password": "yourpassword",
    "moderator": "hackerrankID_moderator"
}
```
4. Run [automation.js](https://github.com/blank0826/Mini-Web-Apps/blob/master/HackerrankAutomation/automation.js), this will open the browser show you logging in and will add all competitions with your mentioned moderator.

# Contact
## [Aditya Srivastava](mailto:aditya26052002@gmail.com?subject=GitHub)
