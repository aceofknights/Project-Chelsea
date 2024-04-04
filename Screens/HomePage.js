import React, { useState } from 'react';
import { StyleSheet, Platform, Image, Text, View, TouchableOpacity, FlatList, Modal  } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo vector icons
import NotificationBanner from '../scripts/NotificationBanner.js'; // Import the NotificationBanner component
import FlashMessage, { showMessage, hideMessage } from 'react-native-flash-message';
import { FontAwesome } from '@expo/vector-icons';

export default function HomePage() {
    const [jobs, setJobs] = useState(generateJobs());
    const [selectedJob, setSelectedJob] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [activeTab, setActiveTab] = useState('NearMe');


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

    // Function to generate job data
    function generateJobs() {
        const generatedJobs = [];
        for (let i = 1; i <= 10; i++) {
            const rating = (Math.random() * 4 + 1).toFixed(1); // Generate a random rating between 1.0 and 5.0 with one decimal point

            generatedJobs.push({
                name: `Job${i}`,
                key: `${i}`,
                restaurant: `Restaurant ${String.fromCharCode(64 + i)}`,
                pay: `Pay: $${10 + i}/hr`,
                distance: `Distance from you: ${i * i} miles`,
                datetime: `When: March ${i}, 2024, ${8 + i}:00 AM`,
                desc: 'Description of shift: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                rating: rating, // Add the random rating to each job

            });
        }
        return generatedJobs;
    }

    const regenerateJobs = () => {
        setJobs(generateJobs());
    };

    const unapplyHandler = (key) => {
      setAppliedJobs(appliedJobs.filter((item) => item.key !== key));
      showMessage({
        message: 'Job unapplied successfully!',
        type: 'info', // You can customize the type (info, success, warning, error)
      });
    };
    
    const renderJobItem = ({ item }) => {
      const isFavorite = favorites.some((fav) => fav.key === item.key);
      const isApplied = appliedJobs.some((job) => job.key === item.key);
    
        
      
    
      if (activeTab === 'Favorites' && !isFavorite) {
        return null; // Don't render non-favorite jobs in Favorites tab
      }
      if (activeTab === 'Applied' && !isApplied) {
        return null; // Don't render non-applied jobs in Applied Jobs tab
      }
    
      return (
        <TouchableOpacity onPress={() => pressHandler(item)} style={styles.item}>
          {/* Job details */}
          <Text style={styles.jobName}>{item.name}</Text>
          <Text style={styles.text}>{item.restaurant}</Text>
          <Text style={styles.text}>{item.pay}</Text>
          <Text style={styles.text}>{item.distance}</Text>
          <Text style={styles.text}>{item.datetime}</Text>
          {/* Conditionally render favorite button based on the view */}
          {(activeTab === 'NearMe' || activeTab === 'Favorites') && (
            <TouchableOpacity onPress={() => favoriteHandler(item.key)} style={styles.favoriteButton}>
              {isFavorite ? (
                <FontAwesome name="bookmark" size={styles.bookmarked.size} color={styles.bookmarked.color} />
              ) : (
                <FontAwesome name="bookmark-o" size={styles.unbookmarked.size} color={styles.unbookmarked.color} />
              )}
            </TouchableOpacity>
          )}
          {/* Render Unapply button in Applied Jobs tab */}
          {(activeTab === 'Applied' && isApplied && (
            <TouchableOpacity onPress={() => unapplyHandler(item.key)} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Unapply</Text>
            </TouchableOpacity>
          ))}
          {/* Render Apply button in Applied Jobs tab for unapplied jobs */}
          {(activeTab === 'Applied' && !isApplied && (
            <TouchableOpacity onPress={() => applyHandler(item.key)} style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      );
    };
    
    
    
    
      
      


    
      return (
        // <LinearGradient colors={['red', 'yellow', 'green', 'blue', 'purple']} style={styles.linearGradient}>
        <View style={styles.container}>
          <FlashMessage position="top" />

          {/* Button to regenerate jobs */}
          <TouchableOpacity onPress={regenerateJobs} style={styles.button}>
            <Text style={styles.buttonText}>Regenerate Jobs</Text>
          </TouchableOpacity>

            {/* Tabs for switching between Jobs Near Me, Favorites, and Applied Jobs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity onPress={() => setActiveTab('NearMe')} style={[styles.tab, activeTab === 'NearMe' && styles.activeTab]}>
                    <Text style={styles.tabText}>Jobs Near Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Favorites')} style={[styles.tab, activeTab === 'Favorites' && styles.activeTab]}>
                    <Text style={styles.tabText}>Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setActiveTab('Applied')} style={[styles.tab, activeTab === 'Applied' && styles.activeTab]}>
                    <Text style={styles.tabText}>Applied Jobs</Text>
                </TouchableOpacity>
            </View>
          
          {/* FlatList to display jobs */}
          <FlatList
            data={showFavorites ? favorites : jobs}
            renderItem={renderJobItem}
            keyExtractor={(item) => item.key}
            style={styles.flatList} // Add this line with your desired style name

          />
      
          {/* Modal for job details */}
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
        // </LinearGradient>
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
    flatList: {
        marginHorizontal: 5,
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
        marginTop: 10,
        padding: 10,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: "#ef8833",
        position: 'relative', // Added to position the favorite button
        borderRadius: 20,
        borderColor: '#331507',
        borderWidth: 3, 

    },
    jobName: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 18,
        color: '#331506',
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
      right: 5,
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
