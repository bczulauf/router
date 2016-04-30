// Mocks the get resources call.
const getResources = () => {
    return new Promise(function(resolve, reject) {
        resolve([{ id: "0", name: "fizztap", kind: "website", lastModified: "5/12/15" }, { id: "1", name: "test vm", kind: "virtualmachine", lastModified: "2/6/16" }])
    })
}

// Mocks the get resourceById call.
const getResourceById = (id) => {
    return new Promise(function(resolve, reject) {
        var data
        
        switch(id) {
            case "0":
                data = { name: "FizzTap", url: "www.fizztap.com", ip: "985.454.454" }
                break
            case "1":
                data = { name: "Test VM", kind: "linux" }
                break
        }
        resolve(data)
    })
}