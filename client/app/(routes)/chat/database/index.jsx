import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { DataTable } from 'react-native-paper';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Button2 from "../../../../components/Button2";

const edit = () => alert('You clicked edit.')


export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{alignItems: 'center'}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title >
                Name
              </DataTable.Title>
              <DataTable.Title text>Date</DataTable.Title>
              <DataTable.Title text>Action</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
              <DataTable.Cell text>Document1.pdf</DataTable.Cell>
              <DataTable.Cell text>09-08-2024</DataTable.Cell>
              <DataTable.Cell >
                <TouchableOpacity onPress={edit}>
                  <FontAwesome6 name="edit" size={18} color="black" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row> 

            <DataTable.Row>
              <DataTable.Cell text>Software.pdf</DataTable.Cell>
              <DataTable.Cell text>09-08-2024</DataTable.Cell>
              <DataTable.Cell >
                <TouchableOpacity onPress={edit}>
                  <FontAwesome6 name="edit" size={18} color="black" />
                </TouchableOpacity>
              </DataTable.Cell>
            </DataTable.Row> 

          </DataTable>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button2 displayText={"Add Data"} onPress={() => alert('You clicked add data.')}/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginTop: 10,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 18,
  },
  footer: {
    paddingBottom: 20,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
});
