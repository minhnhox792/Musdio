import React, { useState, useEffect } from 'react';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useDispatch, useSelector } from "react-redux";

const Search = ({ navigation }) => {

  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const music = useSelector(state => state.musics)
  useEffect(() => {
    setFilteredDataSource(music)
    setMasterDataSource(music)
}, [])
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const input = item.name + ' - ' + item.singer;
        const itemData = item.name + '-' + item.singer
          ? input.toUpperCase()
          : ''.toUpperCase();


        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    const input = item.name + '-' + item.singer;
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getItem(item)}>
        <View style={styles.itemView} >
          <Image style={styles.itemStyle} source={{ uri: item.img }} />
          <Text style={{ fontWeight: 'bold' }}>
            {input.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>


    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an itemaler
    navigation.navigate('NowPlaying', {
      playID: [item.id]
    })
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Find by Singer or Name's Song"
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 30
  },
  itemStyle: {
    padding: '10%',
    height: 50,
    width: 50,
    marginRight: '10%',
    borderRadius: 100,

  },
  itemView: {
    marginTop: '5%',
    flexDirection: 'row',
    //alignContent:'center',
    alignItems: 'center',
  }
});

export default Search;
