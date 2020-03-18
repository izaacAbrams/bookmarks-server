function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: "First test!",
      url: "https://github.com/",
      description: "Github 1",
      rating: 3
    },
    {
      id: 2,
      title: "Second test!",
      url: "https://github.com/2",
      description: "Github 2",
      rating: 3
    },
    {
      id: 3,
      title: "Third test!",
      url: "https://github.com/3",
      description: "Github 3",
      rating: 3
    },
    {
      id: 4,
      title: "Fourth test!",
      url: "https://github.com/4",
      description: "Github 4",
      rating: 3
    },
    {
      id: 5,
      title: "Fifth test!",
      url: "https://github.com/5",
      description: "Github 5",
      rating: 3
    },
    {
      id: 6,
      title: "Sixth test!",
      url: "https://github.com/6",
      description: "Github 6",
      rating: 3
    },
    {
      id: 7,
      title: "Seventh test!",
      url: "https://github.com/7",
      description: "Github 7",
      rating: 3
    },
    {
      id: 8,
      title: "First test!",
      url: "https://github.com/",
      description: "Github 8",
      rating: 3
    }
  ];
}

function makeMaliciousBookmark() {
  const maliciousBookmark = {
    id: 911,
    title: 'Naughty naughty very naughty <script>alert("xss");</script>',
    url: "https://github.com",
    description: `Bad image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie);">. But not <strong>all</strong> bad.`,
    rating: 1
  };
  const expectedBookmark = {
    ...maliciousBookmark,
    title:
      'Naughty naughty very naughty &lt;script&gt;alert("xss");&lt;/script&gt;',
    description: `Bad image <img src="https://url.to.file.which/does-not.exist">. But not <strong>all</strong> bad.`
  };

  return {
    maliciousBookmark,
    expectedBookmark
  };
}

module.exports = {
  makeBookmarksArray,
  makeMaliciousBookmark
};
