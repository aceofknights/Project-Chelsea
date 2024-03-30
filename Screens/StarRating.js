import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Expo for icons

const StarRating = ({ rating, onRate }) => {
  const [selectedRating, setSelectedRating] = useState(rating);

  const handleRate = (selected) => {
    setSelectedRating(selected);
    onRate(selected);
  };

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

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;
