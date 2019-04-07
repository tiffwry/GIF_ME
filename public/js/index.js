let giphy_url="https://api.giphy.com/v1/gifs/search?"
let api_key="api_key=GxP3rAWWiabibTsL3i2Fj2R2g2u8DFQV"

let search_button = document.getElementById("search_button")
let search_string = document.getElementById("search_bar")
let column_heights = [0,0,0,0,0]
let column_ids = [0,1,2,3,4]

search_button.addEventListener("click", function() {submit(search_string)});

let get_shortest_column = (column_heights) => {
    let index = column_heights.reduce((lowest, column_height, currentIndex) => {
        if (column_height < column_heights[lowest]){
            lowest = currentIndex
        }
        return lowest
    }, 0)

    return index
}

function submit(search_string) {

    let url=giphy_url + api_key + "&q=" + search_string.value + "&limit=150&offset=0&rating=R&lang=en"
    let result_url;
    let column_id = 0;

    column_ids.forEach(function(results_column){
        document.getElementById(results_column).innerHTML = ''
    });
    
    $.getJSON(url, function(result){
        result.data.map(result => {
            column_id = get_shortest_column(column_heights)
            console.log(column_id)
            result_url = String(result.images.fixed_width.url)
            result_img_height = parseInt(result.images.fixed_width.height)
            column_heights[column_id] += result_img_height
            document.getElementById(String(column_id)).innerHTML += `<img src=${result_url}>`
        })
    })
}
