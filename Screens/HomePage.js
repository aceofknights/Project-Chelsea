import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

export default function HomePage() {
    const [jobs, setJobs] = useState(generateJobs());
    const [selectedJob, setSelectedJob] = useState(null);

    const pressHandler = (job) => {
        setSelectedJob(job);
        console.log("oh baby click me harder, job: "+job);  

    };

    const favoriteHandler = (key) => {
        console.log("YOU FAVORITE THIS JOB THANK YOU VERY MUCH, JOB NUMBER: " + key);
    }

    const closeModal = () => {
        setSelectedJob(null);
    };

    // Function to generate job data
    function generateJobs() {
        const generatedJobs = [];
        for (let i = 1; i <= 10; i++) {
            generatedJobs.push({
                name: `Job${i}`,
                key: `${i}`,
                restaurant: `Restaurant ${String.fromCharCode(64 + i)}`,
                pay: `Pay: $${10 + i}/hr`,
                distance: `Distance from you: ${i * i} miles`,
                datetime: `When: March ${i}, 2024, ${8 + i}:00 AM`,
                desc: 'Description of shift: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            });
        }
        return generatedJobs;
    }

    const regenerateJobs = () => {
        setJobs(generateJobs());
    };

    return (
        // <LinearGradient colors={['red', 'yellow', 'green', 'blue', 'purple']} style={styles.linearGradient}>
            <View style={styles.container}>
                <TouchableOpacity onPress={regenerateJobs} style={styles.button}>
                <Text style={styles.buttonText}>Regenerate Jobs</Text>
            </TouchableOpacity>
                
                
                
                <FlatList
                    data={jobs}
                    renderItem={({ item }) => (
                        <TouchableOpacity key={item.key} onPress={() => pressHandler(item)} style={styles.item}>
                            <Text style={styles.jobName}>{item.name}</Text>
                            <Text>{item.restaurant}</Text>
                            <Text>{item.pay}</Text>
                            <Text>{item.distance}</Text>
                            <Text>{item.datetime}</Text>
                            
                            <TouchableOpacity onPress={() => favoriteHandler(item.key)} style={styles.favoriteButton}>
                                <Text style={styles.favoriteButtonText}>Favorite</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
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
                        <Text>{selectedJob?.restaurant}</Text>
                        <Text>{selectedJob?.pay}</Text>
                        <Text>{selectedJob?.distance}</Text>
                        <Text>{selectedJob?.datetime}</Text>
                        <Text></Text>
                        <Text>{selectedJob?.desc}</Text>
                        <Text>testing text</Text>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                        {/* Add buttons for applying and other actions */}
                        <TouchableOpacity style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Apply for Job</Text>
                        </TouchableOpacity>
                        {/* Add more buttons as needed */}
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
        paddingHorizontal: 20,
        marginHorizontal: 20,
    },
    image: {
        width: 200, // Set the desired width
        height: 200, // Set the desired height
    },
    item: {
        marginTop: 24,
        padding: 30,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: "orange",
        position: 'relative', // Added to position the favorite button
        borderRadius: 20,
    },
    jobName: {
        fontWeight: 'bold',
        marginBottom: 10,
        fontSize: 18,
    },
    favoriteButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
        padding: 5,
        borderRadius: 5,
    },
    favoriteButtonText: {
        color: '#fff',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
        padding: 20, // Add padding to the modal content
    },

    modalContent: {
        backgroundColor: '#fff', // White background for the modal content
        borderRadius: 10, // Rounded corners
        padding: 20, // Padding inside the modal content
        alignItems: 'center',
        elevation: 5, // Add elevation for Android shadow
    },
    closeButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    applyButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
