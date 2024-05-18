import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, FlatList, StyleSheet, Image, TextInput } from 'react-native';

const data = [
    { id: 1, area: 'Dhaka', phoneNumber: '1234567890' },
    { id: 2, area: 'Bogra', phoneNumber: '0987654321' },
    { id: 3, area: 'Pabna', phoneNumber: '1122334455' },
    { id: 4, area: 'Jessore', phoneNumber: '9988776655' },
    { id: 5, area: 'Chittagong', phoneNumber: '5544332211' },
    { id: 6, area: 'Sylhet', phoneNumber: '7788990011' },
    { id: 7, area: 'Rajshahi', phoneNumber: '6655443322' },
    { id: 8, area: 'Khulna', phoneNumber: '1133557799' },
    { id: 9, area: 'Barisal', phoneNumber: '2244668800' },
    { id: 10, area: 'Rangpur', phoneNumber: '3355779900' },
    { id: 11, area: 'Mymensingh', phoneNumber: '4455667788' },
    { id: 12, area: 'Cox’s Bazar', phoneNumber: '5566778899' },
    { id: 13, area: 'Gazipur', phoneNumber: '6677889900' },
    { id: 14, area: 'Narayanganj', phoneNumber: '7788990011' },
    { id: 15, area: 'Narsingdi', phoneNumber: '8899001122' },
    { id: 16, area: 'Savar', phoneNumber: '9900112233' },
    { id: 17, area: 'Tangail', phoneNumber: '0011223344' },
    { id: 18, area: 'Kushtia', phoneNumber: '1122334455' },
    { id: 19, area: 'Rajbari', phoneNumber: '2233445566' },
    { id: 20, area: 'Munshiganj', phoneNumber: '3344556677' },
    { id: 21, area: 'Manikganj', phoneNumber: '4455667788' },
    { id: 22, area: 'Faridpur', phoneNumber: '5566778899' },
    { id: 23, area: 'Jhenaidah', phoneNumber: '6677889900' },
    { id: 24, area: 'Satkhira', phoneNumber: '7788990011' },
    { id: 25, area: 'Chuadanga', phoneNumber: '8899001122' },
    { id: 26, area: 'Kushtia', phoneNumber: '9900112233' },
    { id: 27, area: 'Meherpur', phoneNumber: '0011223344' },
    { id: 28, area: 'Narail', phoneNumber: '1122334455' },
    { id: 29, area: 'Magura', phoneNumber: '2233445566' },
    { id: 30, area: 'Bagerhat', phoneNumber: '3344556677' },
    { id: 31, area: 'Khulna', phoneNumber: '4455667788' },
    { id: 32, area: 'Sathkira', phoneNumber: '5566778899' },
    { id: 33, area: 'Jashore', phoneNumber: '6677889900' },
    { id: 34, area: 'Narail', phoneNumber: '7788990011' },
    { id: 35, area: 'Chuadanga', phoneNumber: '8899001122' },
    { id: 36, area: 'Meherpur', phoneNumber: '9900112233' },
    { id: 37, area: 'Kushtia', phoneNumber: '0011223344' },
    { id: 38, area: 'Magura', phoneNumber: '1122334455' },
    { id: 39, area: 'Narail', phoneNumber: '2233445566' },
    { id: 40, area: 'Bagerhat', phoneNumber: '3344556677' },
    { id: 41, area: 'Jhenaidah', phoneNumber: '4455667788' },
    { id: 42, area: 'Satkhira', phoneNumber: '5566778899' },
    { id: 43, area: 'Khulna', phoneNumber: '6677889900' },
    { id: 44, area: 'Chapai Nawabganj', phoneNumber: '7788990011' },
    { id: 45, area: 'Naogaon', phoneNumber: '8899001122' },
    { id: 46, area: 'Joypurhat', phoneNumber: '9900112233' },
    { id: 47, area: 'Bogra', phoneNumber: '0011223344' },
    { id: 48, area: 'Natore', phoneNumber: '1122334455' },
    { id: 49, area: 'Rajshahi', phoneNumber: '2233445566' },
    { id: 50, area: 'Sirajganj', phoneNumber: '3344556677' },
    { id: 51, area: 'Pabna', phoneNumber: '4455667788' },
    { id: 52, area: 'Kushtia', phoneNumber: '5566778899' },
    { id: 53, area: 'Meherpur', phoneNumber: '6677889900' },
    { id: 54, area: 'Jhenaidah', phoneNumber: '7788990011' },
    { id: 55, area: 'Chuadanga', phoneNumber: '8899001122' },
    { id: 56, area: 'Magura', phoneNumber: '9900112233' },
    { id: 57, area: 'Narail', phoneNumber: '0011223344' },
    { id: 58, area: 'Kushtia', phoneNumber: '1122334455' },
    { id: 59, area: 'Meherpur', phoneNumber: '2233445566' },
    { id: 60, area: 'Jhenaidah', phoneNumber: '3344556677' },
    { id: 61, area: 'Satkhira', phoneNumber: '4455667788' },
    { id: 62, area: 'Khulna', phoneNumber: '5566778899' },
    { id: 63, area: 'Barishal', phoneNumber: '6677889900' },
    { id: 64, area: 'Patuakhali', phoneNumber: '7788990011' },
];


const TableHeader = (props:any) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={[styles.headerText, { fontWeight: 'bold' }]}>Area</Text>
            <Text style={[styles.headerText, { fontWeight: 'bold' }]}>Phone Number</Text>
            <Text style={[styles.headerText, { fontWeight: 'bold' }]}>Action</Text>
        </View>
    );
};

const TableRow = ({ area, phoneNumber }) => {
    const handleCall = () => {
        Linking.openURL(`tel:${phoneNumber}`);

    };

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.text}>{area}</Text>
            <Text style={styles.text}>{phoneNumber}</Text>
            <TouchableOpacity onPress={handleCall}>
                <Image
                    source={require('../assets/ambulance.png')}
                    style={styles.callIcon}
                />
            </TouchableOpacity>
        </View>
    );
};

const Ambulance = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (text) => {
        setSearchQuery(text);
        const filtered = data.filter(item => item.area.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    };

    const renderItem = ({ item }) => (
        <TableRow area={item.area} phoneNumber={item.phoneNumber} />
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search area..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                />
            </View>
            <TableHeader />
            <FlatList
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center', // Align items vertically in the center
        paddingVertical: 20, // Adjust row height here
        paddingHorizontal: 20,
        marginVertical: 5,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 }, // For iOS shadow
        shadowOpacity: 0.25, // For iOS shadow
        shadowRadius: 3.84, // For iOS shadow
        backgroundColor: '#e6f0ff', // Light blue background
    },
    text: {
        fontSize: 16,
    },
    callIcon: {
        width: 30,
        height: 30,
    },
    searchContainer: {
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        elevation: 5,
    },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
    },
});

export default Ambulance;
