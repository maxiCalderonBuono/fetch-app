export const getPhotoByName = async (inputValue) => {
  try {
    const url1 = "https://api.pexels.com/v1/search?query=" + inputValue;

    const url2 = "https://api.pexels.com/v1/curated";

    const resp = await fetch(inputValue ? url1 : url2, {
      headers: {
        Authorization:
          "563492ad6f9170000100000196f8eabaee41477b9a9b2973717e8497",
      },
    });

    const { photos } = await resp.json();

    return photos;
  } catch (error) {
    console.log(error.message);
  }
};
