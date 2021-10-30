//Extract information of CricInfo of WorldCup 2019 and provide that in the form of excel and pdf scorecards.
// get expereience with js
// node Main.js --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results --excel=Worldcup.xlsx --dataFolder=data

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel4node = require("excel4node");
let pdf = require("pdf-lib");
let fs = require("fs");
let path = require("path");
const { match } = require("assert");

let args = minimist(process.argv);

//download using axios
//read using jsdom
//make excel using excel4node
//make pdf using pdf-lib

let responsePromise = axios.get(args.source);
responsePromise
  .then(function (response) {
    let html = response.data;
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;
    let matches = [];
    let matchInfoDivs = document.querySelectorAll("div.match-score-block");
    for (let i = 0; i < matchInfoDivs.length; i++) {
      let match = {
        t1: "",
        t2: "",
        t1s: "",
        t2s: "",
        result: "",
      };
      let nameTeam = matchInfoDivs[i].querySelectorAll("p.name");
      match.t1 = nameTeam[0].textContent;
      match.t2 = nameTeam[1].textContent;

      let scoreSpan = matchInfoDivs[i].querySelectorAll(
        "div.score-detail > span.score"
      );

      if (scoreSpan.length == 2) {
        match.t1s = scoreSpan[0].textContent;
        match.t2s = scoreSpan[1].textContent;
      } else if (scoreSpan.length == 1) {
        match.t1s = scoreSpan[0].textContent;
        match.t2s = "";
      } else {
        match.t1s = "";
        match.t2s = "";
      }

      let spanResult = matchInfoDivs[i].querySelector("div.status-text > span");
      match.result = spanResult.textContent;
      matches.push(match);
    }

    let matchesJSON = JSON.stringify(matches);
    fs.writeFileSync("matches.json", matchesJSON, "utf-8");

    let teams = [];
    for (let i = 0; i < matches.length; i++) {
      populateTeams(teams, matches[i]);
    }
    for (let i = 0; i < matches.length; i++) {
      populateMatchesinTeams(teams, matches[i]);
    }

    let teamsJSON = JSON.stringify(teams);
    fs.writeFileSync("teams.json", teamsJSON, "utf-8");
    createExcelFile(teams);
    createFolders(teams);
  })
  .catch(function (err) {
    console.log(err);
  });

function createExcelFile(teams) {
  let wb = new excel4node.Workbook();

  for (let i = 0; i < teams.length; i++) {
    let sheet = wb.addWorksheet(teams[i].name);
    sheet.cell(1, 1).string("VS");
    sheet.cell(1, 2).string("Self Score");
    sheet.cell(1, 3).string("Opp Score");
    sheet.cell(1, 4).string("Result");
    for (let j = 0; j < teams[i].matches.length; j++) {
      sheet.cell(j + 2, 1).string(teams[i].matches[j].vs);
      sheet.cell(j + 2, 2).string(teams[i].matches[j].selfScore);
      sheet.cell(j + 2, 3).string(teams[i].matches[j].opponentScore);
      sheet.cell(j + 2, 4).string(teams[i].matches[j].result);
    }
  }

  wb.write(args.excel);
}

function createFolders(teams) {
  if (fs.existsSync(args.dataFolder) == true) {
    fs.rmdirSync(args.dataFolder, { recursive: true });
  }

  fs.mkdirSync(args.dataFolder);
  for (let i = 0; i < teams.length; i++) {
    let teamFN = path.join(args.dataFolder, teams[i].name);
    if (fs.existsSync(teamFN) == true) {
      fs.rmdirSync(teamFN, { recursive: true });
    }

    fs.mkdirSync(teamFN);

    for (let j = 0; j < teams[i].matches.length; j++) {
      let matchFileName = path.join(teamFN, teams[i].matches[j].vs);
      createPDFFile(teams[i].name, teams[i].matches[j], matchFileName);
    }
  }
}

function createPDFFile(teamName, match, matchFileName) {
  let t1 = teamName;
  let t2 = match.vs;
  let t1s = match.selfScore;
  let t2s = match.opponentScore;
  let result = match.result;

  let pdfDocument = pdf.PDFDocument;
  let templateBytes = fs.readFileSync("Template.pdf");
  let promiseToLoadBytes = pdfDocument.load(templateBytes);
  promiseToLoadBytes.then(function (pdfdoc) {
    let page = pdfdoc.getPage(0);
    page.drawText(t1, {
      x: 320,
      y: 650,
      size: 10,
    });
    page.drawText(t2, {
      x: 320,
      y: 630,
      size: 10,
    });
    page.drawText(t1s, {
      x: 320,
      y: 610,
      size: 10,
    });
    page.drawText(t2s, {
      x: 320,
      y: 590,
      size: 10,
    });
    page.drawText(result, {
      x: 320,
      y: 570,
      size: 10,
    });

    let finalPDFBytes = pdfdoc.save();
    finalPDFBytes.then(function (finalPDFBytes) {
      if (fs.existsSync(matchFileName + ".pdf") == true) {
        fs.writeFileSync(matchFileName + "1.pdf", finalPDFBytes);
      } else {
        fs.writeFileSync(matchFileName + ".pdf", finalPDFBytes);
      }
    });
  });
}

function populateTeams(teams, match) {
  let t1index = teams.findIndex(function (team) {
    if (team.name == match.t1) {
      return true;
    } else {
      return false;
    }
  });

  if (t1index == -1) {
    let team = {
      name: match.t1,
      matches: [],
    };
    teams.push(team);
  }

  let t2index = teams.findIndex(function (team) {
    if ((team.name = match.t2)) {
      return true;
    } else {
      return false;
    }
  });

  if (t2index == -1) {
    let team = {
      name: match.t2,
      matches: [],
    };
    teams.push(team);
  }
}

function populateMatchesinTeams(teams, match) {
  let t1index = teams.findIndex(function (team) {
    if (team.name == match.t1) {
      return true;
    }
  });

  let team1 = teams[t1index];
  team1.matches.push({
    vs: match.t2,
    selfScore: match.t1s,
    opponentScore: match.t2s,
    result: match.result,
  });

  let t2index = teams.findIndex(function (team) {
    if (team.name == match.t2) {
      return true;
    }
  });

  let team2 = teams[t2index];
  team2.matches.push({
    vs: match.t1,
    selfScore: match.t2s,
    opponentScore: match.t1s,
    result: match.result,
  });
}
