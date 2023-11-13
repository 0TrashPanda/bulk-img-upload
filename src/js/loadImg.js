    // Function to create album HTML
    function createAlbumHTML(album) {
        const albumElement = document.createElement('div');
        albumElement.classList.add('album');
  
        const albumTitle = document.createElement('h2');
        albumTitle.textContent = album.name;
        albumElement.appendChild(albumTitle);
  
        const imagesContainer = document.createElement('div');
        imagesContainer.classList.add('images');
  
        album.images.forEach(image => {
          const imgA = document.createElement('a');
          imgA.setAttribute("data-fslightbox", album.name);
          imgA.href = image.link;
          const imgElement = document.createElement('img');
          imgElement.classList.add('thumbnail');
          imgA.appendChild(imgElement);
          imgElement.src = image.thumbnail;
          // You can add alt text if it's available in your JSON
          imagesContainer.appendChild(imgA);
        });
  
        albumElement.appendChild(imagesContainer);
  
        return albumElement;
      }
  
      // Function to render albums on the page
      function renderAlbums(albums) {
        const albumsContainer = document.getElementById('albums-container');
        albums.forEach(album => {
          const albumHTML = createAlbumHTML(album);
          albumsContainer.appendChild(albumHTML);
          refreshFsLightbox();
        });
      }
  
      // Fetch the JSON data from images.json
      fetch('/images.json')
        .then(response => response.json())
        .then(data => renderAlbums(data.albums))
        .catch(error => console.error('Error fetching data:', error));
  