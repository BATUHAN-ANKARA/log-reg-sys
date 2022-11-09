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

const getDashboardPage = (req, res) => {
    res.render("dashboard", {
        link: "dashboard",
    })
}

const getPlandetailPage = (req, res) => {
    res.render("plandetail", {
        link: "plandetail",
    })
}


export{getIndexPage, getDashboardPage, getRegisterPage, getLoginPage, getPlandetailPage}