// create new function to save participants DataTransfer

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadlink;

    //Retrieve csv file from experiment
    // csvFile = new Blob( blobParts: [csv], options:{type: "text/csv"});

    csvFile = new Blob([csv], {type: "text/csv"});

    //Download link
    downloadlink = document.createElement("a");

    //Retrieve File name
    downloadlink.download = filename;

    //Create a link to the file
    downloadlink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadlink.style.display = "none";

    // Add link to the DOM
    document.body.appendChild(downloadlink);

    downloadlink.click();

}