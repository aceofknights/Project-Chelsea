import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Image, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { SearchPage } from './SearchPage.js';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons

export default function HomePage() {
  const navigation = useNavigation(); // Initialize navigation hook

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState('NearMe');

  useEffect(() => {
    setJobs(generateJobs());
  }, []);

  const pressHandler = (job) => {
    setSelectedJob(job);
  };

  const favoriteHandler = (key) => {
    const job = jobs.find((item) => item.key === key);
    if (job) {
      const isFavorite = favorites.some((item) => item.key === key);
      if (isFavorite) {
        setFavorites(favorites.filter((item) => item.key !== key));
        showMessage({
          message: 'removed',
          type: 'error', // You can customize the type (info, success, warning, error)
        });
      } else {
        setFavorites([...favorites, job]);
        showMessage({
          message: 'Saved',
          type: 'warning', // You can customize the type (info, success, warning, error)
        });
      }
    }
  };

  const applyHandler = () => {
    if (selectedJob) {
      setAppliedJobs([...appliedJobs, selectedJob]);
      showMessage({
        message: 'Successfully applied for the job!',
        type: 'success',
      });
    }
    setSelectedJob(null);
  };

  const closeModal = () => {
    setSelectedJob(null);
  };

  function generateJobs() {
    const generatedJobs = [];
    const images = ['work', 'work2', 'work3'];
    for (let i = 1; i <= 10; i++) {
      const rating = (Math.random() * 4 + 1).toFixed(1);
      const selectedImage = images[Math.floor(Math.random() * images.length)];
      const job = {
        name: `Job Role${i}`,
        key: `${i}`,
        restaurant: `Restaurant ${String.fromCharCode(64 + i)}`,
        pay: `$${10 + i}/hr`,
        distance: `${i * i} miles`,
        datetime: `May ${i}, 2024, ${1 + i}:00 AM - ${11 + i}:00 pm`,
        desc:
          'Description of shift: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        rating: rating,
        image: selectedImage,
      };
      job.pay = (
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Pay:</Text> {job.pay}
        </Text>
      );
      job.distance = (
        <Text>
          <Text style={{ fontWeight: 'bold' }}>Distance from you:</Text> {job.distance}
        </Text>
      );
      job.datetime = (
        <Text>
          <Text style={{ fontWeight: 'bold' }}>When:</Text> {job.datetime}
        </Text>
      );
      generatedJobs.push(job);
    }
    return generatedJobs;
  }

  const unapplyHandler = (key) => {
    setAppliedJobs(appliedJobs.filter((item) => item.key !== key));
    showMessage({
      message: 'Job unapplied successfully!',
      type: 'info',
    });
  };

  const renderJobItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.key === item.key);
    const isApplied = appliedJobs.some((job) => job.key === item.key);

    if (activeTab === 'Favorites' && !isFavorite) {
      return null;
    }
    if (activeTab === 'Applied' && !isApplied) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => pressHandler(item)} style={styles.item}>
        <Image
          source={
            item.image === 'work'
              ? require('../assets/work.jpg')
              : item.image === 'work2'
              ? require('../assets/work2.jpg')
              : require('../assets/work3.jpg')
          }
          style={styles.mainImage}
        />
        <View style={styles.jobDetailsContainer}>
          <View style={styles.jobInfoContainer}>
            <Text style={styles.jobName}>{item.name}</Text>
            <Text style={styles.restaurantName}>{item.restaurant}</Text>
          </View>
          <Text style={styles.text}>{item.pay}</Text>
          <Text style={styles.text}>{item.distance}</Text>
          <Text style={styles.text}>{item.datetime}</Text>
        </View>
        {(activeTab === 'NearMe' || activeTab === 'Favorites') && (
          <TouchableOpacity onPress={() => favoriteHandler(item.key)} style={styles.favoriteButton}>
            {isFavorite ? (
              <FontAwesome name="bookmark" size={styles.bookmarked.size} color={styles.bookmarked.color} />
            ) : (
              <FontAwesome name="bookmark-o" size={styles.unbookmarked.size} color={styles.unbookmarked.color} />
            )}
          </TouchableOpacity>
        )}
        {(activeTab === 'Applied' && isApplied) && (
          <TouchableOpacity onPress={() => unapplyHandler(item.key)} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Unapply</Text>
          </TouchableOpacity>
        )}
        {(activeTab === 'Applied' && !isApplied) && (
          <TouchableOpacity onPress={() => applyHandler(item.key)} style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const handleSearch = () => {
    navigation.navigate('SearchPage');
  };

  return (
    <View style={styles.container}>
      <FlashMessage position="top" />
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome name="search" size={20} style={styles.searchIcon} />
          <TouchableOpacity onPress={handleSearch} style={styles.searchInput}>
            <View>
              <Text>Search</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.divider} />
          <FontAwesome name="map-marker" size={20} style={styles.locationIcon} />
          <TextInput
            placeholder="Enter your location"
            style={styles.locationInput}
          />
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab('NearMe')} style={[styles.tab, activeTab === 'NearMe' && styles.activeTab]}>
          <Text style={styles.tabText}>Jobs Near Me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Favorites')} style={[styles.tab, activeTab === 'Favorites' && styles.activeTab]}>
          <Text style={styles.tabText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Applied')} style={[styles.tab, activeTab === 'Applied' && styles.activeTab]}>
          <Text style={styles.tabText}>Applied</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={showFavorites ? favorites : jobs}
        renderItem={renderJobItem}
        keyExtractor={(item) => item.key}
        style={styles.flatList}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedJob !== null}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.jobName}>{selectedJob?.name}</Text>
            <Image
              source={require('../assets/rest_icon.png')}
              style={styles.image}
            />
            <Text style={styles.restaurant}>{selectedJob?.restaurant}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#f1c40f" style={styles.starIcon} />
              <Text style={styles.ratingText}>{selectedJob?.rating}</Text>
            </View>
            <View style={styles.shadowContainer}>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalText}>{selectedJob?.pay}</Text>
                <Text style={styles.modalText}>{selectedJob?.distance}</Text>
                <Text style={styles.modalText}>{selectedJob?.datetime}</Text>
                <Text style={styles.modalText}>{selectedJob?.desc}</Text>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={applyHandler} style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    // linearGradient: {
    //     flex: 1,
    //     paddingLeft: 15,
    //     paddingRight: 15,
    //     borderRadius: 5
    // },
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#fef4f0',
    },
    searchContainer: {
      paddingHorizontal: 16,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EAEAEA',
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    searchIcon: {
      marginRight: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 10, // Adjust as needed for input padding
    },
    locationIcon: {
      marginLeft: 'auto',
      color: 'brown',
      marginRight: 10,
    },
    locationInput: {
      flex: 1,
      fontSize: 16,
      paddingVertical: 10, // Adjust as needed for input padding
    },
    divider: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: 'brown',
      left: '50%', // Move the divider to the middle horizontally
      transform: [{ translateX: -0.5 }], // Move it back to the left by half of its own width
      zIndex: 2,
    },
  
    flatList: {
        marginHorizontal: 12,
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'gray',
    },
    activeTab: {
        borderBottomColor: 'orange',

    },
    tabText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    image: {
        width: 200,
        height: 200, 
    },
    item: {
        padding: 10,
        fontSize: 24,
    },
    mainImage: {
      borderRadius: 20,
      height: 160,
      width: 350,
    },
    jobInfoContainer: {
      flexDirection: 'row', // Arrange job name and restaurant name horizontally
      alignItems: 'center', // Align items vertically
    },
    jobName: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#331506',
    },
    restaurantName: {
      marginLeft: 15, // Add some spacing between job name and restaurant name
      position: 'relative',
    },
    text: {
        color: '#331507',
    },
    restaurant: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#331506',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    starIcon: {
        marginRight: 5,
    },
    ratingText: {
        fontSize: 16,
    },
    bookmarked: {
      color: '#0e4fdb', // Blue color for bookmarked icon
      size: 30, // Icon size
    },
    unbookmarked: {
      color: '#331507', // brown color for unbookmarked icon
      size: 30, // Icon size
    },
    favoriteButton: {
      position: 'absolute',
      right: 20,
      bottom: 55,
      borderRadius: 3,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginLeft: 200, // Adjust as needed for spacing
    },

    favoriteButtonText: {
      fontSize: 30,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        padding: 20, 
    },
    
    modalTextContainer: {
      alignItems: 'center',
      borderWidth: 3, 
      borderColor: '#331507', 
      padding: 5, 
      backgroundColor: '#cbc3c0', // Slightly darker background color
      elevation: 15,
    },
    modalContent: {
        backgroundColor: '#fef4f0', 
        borderRadius: 40, 
        padding: 20, 
        alignItems: 'center',
        elevation: 10, 
        
    },
    buttonsContainer: {
      flexDirection: 'row', // Align items horizontally
      justifyContent: 'space-between', // Space buttons evenly
      paddingHorizontal: 20, // Add horizontal padding to the container

    },
    closeButton: {
        backgroundColor: '#ef8833',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        marginRight: 10,
        elevation: 5,
    },
    closeButtonText: {
        color: '#331507',
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: '#ef8833',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        elevation: 5,
    },
    applyButtonText: {
        color: '#331507',
        fontWeight: 'bold',
    },
});
