const source = $("#wonders-template").html()
const template = Handlebars.compile(source)

const render = function(wonders){
    $("#wonders").empty()
    let newHtml = template({wonders})
    $("#wonders").append(newHtml)
}

const fetch = function(){
    $.get("/wonders", function(response){
        render(response)
    })
}

const addWonder = function(){
    let newWonder = $("#new-wonder-input").val()
    let newLocation = $("#new-location-input").val()
    //POST the newWonder to the server
    let data = {name :newWonder , location : newLocation}

    $.post(`/wonder` ,data ,function (response) {
        console.log(`POST complete`)
        console.log(response)
    })
}


const updateVisited = function (wonder) {
    $.ajax({
        url : `/wonder/${wonder}` ,
        method : `PUT` ,
        success : function (response) {
            console.log(response)
            fetch()
        }
    })
}  

$("#wonders").on("click", ".visit", function(){
    let wonder = $(this).closest(".wonder").find(".name").text()
    //PUT this to the server: update the wonder's `visited` status to `true`
    wonder = wonder.split(`-`)[0].trim()
    updateVisited(wonder)
})


fetch() //load the data on page load



/* $.ajax({
    url: '/wonder/Colosseum',
    method: "DELETE",
    success: function () { fetch() }
}) */