import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for icons

// this script is for rendering the stars on the activity/history page
// StarRating component takes two props: rating (current rating) and onRate (callback function for when a rating is selected)
const StarRating = ({ rating, onRate }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  // Function to handle the selection of a star rating
  const handleRate = (selected) => {
    setSelectedRating(selected);
    onRate(selected);
  };

  // Function to render the star icons based on the selected rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => handleRate(i)}>
          <Ionicons
            name={i <= selectedRating ? 'star' : 'star-outline'}
            size={30}
            color={i <= selectedRating ? '#f1c40f' : '#ccc'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };
  
  // Render the stars horizontally
  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;
