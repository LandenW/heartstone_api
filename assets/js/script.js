(function() {

  //stops refresh when enter is click in search box
  $("#form-field").submit(function() {
      return false;
  });

  $(function() {
  //declair varibles
    let tableBody = $("#heroBody")
    let tableHead = $("#heroHeading")
    let heroList
    let heroFirstName
    let heroLastName
    let heroIcon
    let heroClass
    let heroColor
    let isPremium
    let newRow
    let tableHeading
    let homeButton = $("#home")
    let searchURL = "http://localhost:1337/hero"

      //function to hit the API and grab hero names and pictures then populate thos in a table
    function getHeros() {
      $.get(searchURL, function (data){

        heroList = data

        tableHeading = $(`
          <th></th>

          <th>Hero Picture</th>
          <th>Hero Name</th>
          <th>Hero Class</th>
          <th>Premium Class?</th>
          <th>Hero Color</th>
          `)
        tableHead.append(tableHeading)


        for (let i = 0; i < data.length; i++) {
        heroFirstName = data[i].heroFirstName
        heroLastName = data[i].heroLastName
        heroClass = data[i].heroClass
        heroIcon = data[i].image
        isPremium = data[i].isPremium
        heroColor = data[i].heroColor


        newRow = $(`
          <tr>
            <td><img class="deleteRecord" data-heroid="${data[i].id}" src="../assets/images/cancelico.png">
            <button class="editRecord" data-heroid="${data[i].id}">Edit</button></td>
            <td><img class="heroicon" src="${heroIcon}.jpg"/></td>
            <td><h2>${heroFirstName} ${heroLastName}</h2></td> +
            <td>${heroClass}</td>
            <td class="upperCase">${isPremium}</td>
            <td class="upperCase"><div style="background-color:${heroColor};"></div>${heroColor}</td>
          </tr>
          `)
        tableBody.append(newRow)
        }
      })
    }

      //run function
      getHeros()

      tableBody.on("click", ".deleteRecord", function(e){   
        searchURL += "/" + $(this).data("heroid")
        $.ajax({
            url: searchURL,
            type: 'DELETE',
            success: function(result) {
                alert("Successfully Deleted")
                tableHead.html("");
                tableBody.html("");
                searchURL = "http://localhost:1337/hero"
                getHeros()
            }
          });
      })

    let serialData
    let submitButton = $("#addrow")


    submitButton.on("click", function(e) {
      e.preventDefault();
      searchURL = "http://localhost:1337/hero"
      serialData = $("#form-field").serialize()

    // $.post(searchURL, serialData)
      $.ajax({
        type: 'POST',
        url: searchURL,
        data: serialData,
        success: function(){
          $("#form-field")[0].reset()
          $(tableHead).html("");
          $(tableBody).html("");
          getHeros();
        }
      })
    })

let editButton = $(".editRecord")

  tableBody.on("click", ".editRecord", function(hero) {
    alert($(this).data("heroid"))
    // $.get("searchURL" + "/" + $(this).data("heroid"), function(hero){

      $.each(hero, function(key, val){
          let el = $('[heroFirstName=" + '+key+' "]');
          let type = el.attr('type');

              //based on the type choose how we set the value
              switch(type){
                  case 'checkbox':
                      el.attr('checked', 'checked');
                      break;
                  case 'radio':
                      el.filter('[value="'+val+'"]').attr('checked', 'checked');
                      break;
                  default:
                      el.val(val);
              }
      })
    })
  })
})();
