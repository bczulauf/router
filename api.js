// Mocks the get resources call.
const getResources = () => {
    return new Promise(function(resolve, reject) {
        resolve([{ id: "0", name: "fizztap", kind: "web app", lastModified: "5/12/15" }, { id: "1", name: "test vm", kind: "virtual machine", lastModified: "2/6/16" }])
    })
}

// Mocks the get resourceById call.
const getResourceById = (id) => {
    return new Promise(function(resolve, reject) {
        var items
        
        switch(id) {
            case "0":
                items = [{ name: "General Info", url: "/info" }, { name: "Publish", url: "/publish" }, { name: "Settings", url: "/settings" }]
                break
            case "1":
                items = [{ name: "General Info", url: "/info" }, { name: "VM stuff", url: "/publish" }, { name: "Settings", url: "/settings" }]
                break
        }
        resolve({
            menuItems: items
        })
    })
}