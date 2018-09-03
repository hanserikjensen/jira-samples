var JiraClient = require('jira-connector');

var jira = new JiraClient({
    host: 'elasticbox.atlassian.net',
    basic_auth: {
        base64: 'base64encodedCredentialGoesHere=='
    }
});

function SearchCLCOpsIssues () {
    jira.search.search({
        jql: 'project = CLCOPS AND status IN ("Triage", "In Progress") ORDER BY Priority, status'
    }, (error, issues) => {
        if (error) throw error; // probably should be handling errors in case you get one from Jira
        // var issues = searchResults.issues;
        issues.issues.forEach(function (issue) {
            console.log(issue.fields.issuetype.name, "|", issue.fields.status.name, "|", issue.fields.summary);
        });
    });
}

function FindUser(username){
    jira.user.search({
        username: username
        }, (error, users) => {
            if (error) throw error;
            users.forEach(function (user){
            console.log(user.name, "|", user.displayName, "|",user.emailAddress, "|", user.accountId);
            });
        });
}  

var myuser = "James"

//SearchCLCOpsIssues();
FindUser(myuser);
