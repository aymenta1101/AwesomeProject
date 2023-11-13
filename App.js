import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Alert } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [selectedType,setSelectedType]=useState('');
  const type=['Holiday','Travel','Today']

  const handleAddTask = () => {
    Keyboard.dismiss();
    if(selectedType==''){
     return Alert.alert('Please select type !!')
    }
    //obj ={text:task , type: selectedType }
    setTaskItems([...taskItems, {text:task,type:selectedType}])
    setSelectedType('');
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  const setType=(text)=>{
    setSelectedType(text);
  }

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
       {/* Today's Tasks */}
     <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.filter(obj=>obj.type=='Today').map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item.text} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      {/* Holiday's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Holiday's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.filter(obj=>obj.type=='Holiday').map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item.text} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      
      {/* Travel's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Travel's tasks</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.filter(obj=>obj.type=='Travel').map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item.text} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
     
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
     
      <View style={styles.typeWrapper}>
       {
        type.map((text)=>{
          return(
            <TouchableOpacity onPress={()=>setType(text)} key={text} style={{paddingHorizontal:20,paddingVertical:10,borderRadius:5,backgroundColor:selectedType==text?'black':'grey'}}>
             <Text style={{color:'#fff'}}>{text}</Text>
            </TouchableOpacity>
          )
        })
       }  
      </View>


      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  typeWrapper: {
    position: 'absolute',
    bottom: 140,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
