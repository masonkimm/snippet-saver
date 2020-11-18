console.log('JS CONNECTED');




//to show create new snippet area on btn click
$('#mainBtn').on('click', showCreateNewArea);
function showCreateNewArea() {
  $('#mainContent').toggle();
  // $('#selectedContent').toggle();
  if ($('#selectedContent').css('display') === 'block') {
    $('#selectedContent').toggle();
  }
}
//to show selected data on btn click
$('li').on('click', showSelectedContent);
function showSelectedContent() {
  //to prevent items overlapping
  if ($('#mainContent').css('display') === 'block') {
    $('#mainContent').toggle();
  } //to toggle and display selected content, but only when display is none;
  if ($('#selectedContent').css('display') === 'none') {
    $('#selectedContent').toggle();
  }
  //to toggle on selected language display field
  if ($('#selectedLanguage').css('display') === 'none') {
    $('#selectedLanguage').toggle();
  }
  //to grab id of button clicked to pass on to router
  const id = $(this).val();
  // console.log(id);
  $.ajax({
    url: 'api/' + id,
    method: 'POST',
    // }).then(fillContentWithData)
  }).then(function (data) {
    $('#selectedID').text(data[0].id);
    $('#selectedTitle').text(data[0].title);
    $('#selectedLanguage').text(data[0].language);
    $('#selectedDesc').text(data[0].description);
    $('#selectedSnippet').text(data[0].snippet);
  });
}
//to save a new snippet
$('#saveNewSnippet').on('click', saveNewSnippet);
function saveNewSnippet() {
  //to grab user input from text field
  let newSnippet = {
    title: $('#snippetTitle').val(),
    language: $('#snippetLanguage option:selected').text(),
    description: $('#snippetDesc').val(),
    snippet: $('#snippetBody').val(),
  };
  // console.log(newSnippet)
  //passing on to router
  $.ajax('/createSnippet', {
    data: newSnippet,
    type: 'POST',
  }).then(location.reload('/'));
}
//to delete a snippet
$('#deleteBtn').on('click', deleteSnippet);
function deleteSnippet() {
  //to grab snippet id from passed on value from db
  let snippetID = $('#selectedID').text();

  // console.log(snippetID);
  $.ajax(`/api/delete/${snippetID}`, {
    type: 'DELETE',
  }).done(location.reload('/index'));
}
//to display snippet update form
$('#updateBtn').on('click', showUpdateForm);
function showUpdateForm() {
  //to toggle on/off various display-contents
  $('#mainContent').toggle();
  $('#selectedContent').toggle();
  $('#saveNewSnippet').toggle();
  $('#saveUpdatedSnippet').toggle();
  $('#selectedLanguage').toggle();
  $('#selectedUpdatedLanguage').toggle();
  //to pre-fill the input areas with corresponding data
  $('#snippetID').val($('#selectedID').text());
  $('#snippetTitle').val($('#selectedTitle').text());
  $('#snippetLanguage option:selected').text($('#selectedLanguage').text());
  $('#snippetDesc').val($('#selectedDesc').text());
  $('#snippetBody').val($('#selectedSnippet').text());
}
//to save updated snippet
$('#saveUpdatedSnippet').on('click', saveUpdatedSnippet);
function saveUpdatedSnippet() {
  let snippetID = $('#selectedID').text();
  // console.log(snippetID);
  let updatedSnippet = {
    id: snippetID,
    title: $('#snippetTitle').val(),
    language: $('#snippetLanguage option:selected').text(),
    description: $('#snippetDesc').val(),
    snippet: $('#snippetBody').val(),
  };
  // console.log(updatedSnippet);
  $.ajax('/api/update', {
    type: 'PUT',
    data: updatedSnippet,
  }).then(location.reload('/'));
}
