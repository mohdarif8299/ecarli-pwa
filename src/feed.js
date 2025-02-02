const dataItems = [
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/banana.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/baby.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/banana.jpg"
      ],
      correctIndex: 2
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/car.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/buggy.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/car.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/dog.jpg"
      ],
      correctIndex: 1
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/fish.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/fish.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/bubbles.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bubbles.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/socks.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/banana.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/baby.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/banana.jpg"
      ],
      correctIndex: 2
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/car.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/buggy.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/car.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/dog.jpg"
      ],
      correctIndex: 1
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/fish.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/fish.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/bubbles.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bubbles.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/socks.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/fish.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/fish.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/bubbles.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bubbles.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/socks.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/banana.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/baby.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/banana.jpg"
      ],
      correctIndex: 2
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/car.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/buggy.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/car.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/dog.jpg"
      ],
      correctIndex: 1
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/fish.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/fish.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/bubbles.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bubbles.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/socks.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/banana.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/baby.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/banana.jpg"
      ],
      correctIndex: 2
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/car.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/buggy.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/car.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/dog.jpg"
      ],
      correctIndex: 1
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/fish.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/fish.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/bubbles.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bubbles.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/socks.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/fish.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/fish.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bird.jpg"
      ],
      correctIndex: 0
    },
    {
      video: "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/videos/bubbles.mp4",
      images: [
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/bubbles.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/toothbrush.jpg",
        "https://backendlessappcontent.com/22B4C8EB-014E-4AA5-A563-0231CB4187EB/F29E4C4F-2EC8-4D3F-B5A7-3F09DBE5E9F0/files/images/socks.jpg"
      ],
      correctIndex: 0
    },
    
  ];

  useEffect(() => {
    const saveData = async () => {
        try {
            for (let item of dataItems) {
                const savedItem = await Backendless.Data.of("TestItems").save(item); 
                console.log("Saved:", savedItem);
            }
            console.log("All data saved successfully!");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    if (dataItems?.length > 0) {
        saveData();
    }
}, [dataItems]);