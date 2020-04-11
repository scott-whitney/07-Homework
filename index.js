const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        name: "username",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "Description",
        message: "What is a short project description?"
    },
    {
        type: 'input',
        name: 'Usage',
        message: 'How would this website be used?'
    },
    {
        type: 'input',
        name: 'License',
        message: 'Licenses in this project'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'installation guide'
    },
    {
        type: 'input',
        name:  'Contributors',
        message: 'What are the profile names of the other contributors to this project?'
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is you email?'
    }
]).then(async answers => {
    console.log(answers)
  

    
    const queryUrl = `https://api.github.com/users/${answers.username}`
    let date = ''
    let profileLink = ''
    let avatarUrl = ''
    let bio = ''
    let company = ''
    let hire = ''
    try {
        const response = await axios.get(queryUrl)


               // console.log(response)
               console.log(response.headers.date)
               date = response.headers.date
               // link o git hub profile
               console.log(response.config.url)
               profileLink = response.config.url
               // link to github avatar
               console.log(response.data.avatar_url)
               avatarUrl = response.data.avatar_url
               // github bio
               console.log(response.data.bio)
               bio = response.data.bio
               console.log(response.data.company)
               company = response.data.company
               console.log(response.data.hireable)
               hire = response.data.hireable
               




    } catch(e){

    }
    let stringThis = `
    *${date}*

    # Description
    *${answers.Description}*

    # table of contents:
    1. Description
    1. Installation
    1. Usage
    1. Contributors
    1. Additional Info

    # Intstallation
    ${answers.installation}

    # Usage
    ${answers.Usage}

    ### GitHub UserName
    *${answers.username}*
    ### Contributors
    **${answers.Contributors}**

    # Additional Info
    *${answers.License}*
    ##${answers.email}##
    [GitHub](${profileLink})
    ![Github Avatar](${avatarUrl})
    *${bio}*
    ${company}
    ${hire}
`
   console.log(stringThis)

    fs.writeFile('README.md', stringThis, function(err){
        if (err) {
            return console.log(err);
        }
        console.log('Success!')
    })

        

})

