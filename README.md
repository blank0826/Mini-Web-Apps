# <ins>Mini-Web-Apps</ins>
# A. Cric-Info Extractor
## Description
This web-app extracts information of matches from the website [CricInfo](www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results) and then creates folder for each team with pdfs for every match played by the respective team.

We recieve the HTML and getthe appropriate JSON data required for creating folders and pdfs. After JSON from website we create our own JSON with keeping teams as the main object and from there we create files and then pdfs that hold record of the match.

## Screenshots
### <ins>Folders of Each Team</ins>
<img src="https://user-images.githubusercontent.com/33955028/140860482-52f9ce83-f958-49bd-8926-62ec9bb2af1c.png" width="550" height="250">

### <ins>PDF for Each Match for Respective Team</ins>
<img src="https://user-images.githubusercontent.com/33955028/140860697-bbcf1880-b309-4feb-a53c-aaff4543e29a.png" width="550" height="250">
(*Data shown are the matches played by Team INDIA)*

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
This web-app is an automation to add moderators to your competetion using **puppeteer**. This logs in to your Hackerrank account and will add a moderator to all the competetions created by you.

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
3. In the config.json enter you own details in the form
```
{
    "userid": "youremail@example.com",
    "password": "yourpassword",
    "moderator": "hackerrankID_moderator"
}
```
4. Run [automation.js](https://github.com/blank0826/Mini-Web-Apps/blob/master/HackerrankAutomation/automation.js), this will open the browser show you logging in and will add all competetions with your mentioned moderator.
