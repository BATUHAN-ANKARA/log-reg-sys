const getIndexPage = (req, res) => {
    res.render("index", {
        link: "index",
    })
}

const getRegisterPage = (req, res) => {
    res.render("register", {
        link: "register",
    })
}

const getLoginPage = (req, res) => {
    res.render("login", {
        link: "login",
    })
}


export{getIndexPage, getRegisterPage, getLoginPage}