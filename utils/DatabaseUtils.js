import {AsyncStorage} from 'react-native' ;
import React from 'react' ;

//key and value is string datatype  

insertSingleRow = async (key , value) => {
    try {
        await AsyncStorage.setItem( key , value )
        return "sucess"
    } catch (error) {
        return error
    }
}

selectSingleRow =  async (Key) => {
    try {
        const value = await AsyncStorage.getItem(Key)
        if (value !== null){
            return value
        }
        return "null"
    } catch (error) {
        return error
    }
}

updateRow = async () => {
    let UID123_object = {
        name: 'Chris',
        age: 30,
        traits: {hair: 'brown', eyes: 'brown'},
    };
    // You only need to define what will be added or updated
    let UID123_delta = {
        age: 31,
        traits: {eyes: 'blue', shoe_size: 10},
    };
    
    AsyncStorage.setItem('UID123', JSON.stringify(UID123_object), () => {
        AsyncStorage.mergeItem('UID123', JSON.stringify(UID123_delta), () => {
        AsyncStorage.getItem('UID123', (err, result) => {
            if(result != null ){
                console.log(result)
            }
        });
        });
    });
}

insertMultipleRow = async () => {
    let UID123_object = {
        name: 'Chris',
        age: 30,
        traits: {hair: 'brown', eyes: 'brown'},
    };
    AsyncStorage.multiSet([['k1', JSON.stringify(UID123_object)], ['k2', 'val2'],['index1','joice']],(error)=>{
        if(error!=null){
            console.log(error)
        }
    });
}

selectMultipleRow = async () => {
    AsyncStorage.multiGet(['k1', 'k2','index1'], (err, results)=>{
        if(err!= null){
            console.log(err)
        }
        results.map((result, i, store) => {
            let key = store[i][0];
            console.log(key)
            let value = store[i][1];
            console.log(value)
        });
    }) 
}

getAllKeys = async () => {
    AsyncStorage.getAllKeys((err, keys = ['k1', 'k2']) => {
        AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {
            // get at each store's key/value so you can work with it
            let key = store[i][0]
            console.log(key)
            let value = store[i][1]
            console.log(value)
        });
        });
    });
}

updateMultipleRow = async () => {
    let UID234_object = {
        name: 'Chris',
        age: 30,
        traits: {hair: 'brown', eyes: 'brown'},
    };
      
    // first user, delta values
    let UID234_delta = {
        age: 31,
        traits: {eyes: 'blue', shoe_size: 10},
    };
    
    // second user, initial values
    let UID345_object = {
        name: 'Marge',
        age: 25,
        traits: {hair: 'blonde', eyes: 'blue'},
    };
    
    // second user, delta values
    let UID345_delta = {
        age: 26,
        traits: {eyes: 'green', shoe_size: 6},
    };
    
    let multi_set_pairs = [
    ['UID234', JSON.stringify(UID234_object)],
    ['UID345', JSON.stringify(UID345_object)],
    ];
    let multi_merge_pairs = [
    ['UID234', JSON.stringify(UID234_delta)],
    ['UID345', JSON.stringify(UID345_delta)],
    ];
    
    AsyncStorage.multiSet(multi_set_pairs, err => {
    AsyncStorage.multiMerge(multi_merge_pairs, err => {
        AsyncStorage.multiGet(['UID234', 'UID345'], (err, stores) => {
        stores.map((result, i, store) => {
            let key = store[i][0]
            let val = store[i][1]
            console.log(key, val)
        });
        });
    });
    });
}

clearDatabase = async () => {
    AsyncStorage.clear((err) => {
        console.log(err)
    })
}

module.exports = {
    insertSingleRow,
    selectSingleRow,
    clearDatabase,
    updateMultipleRow,
    getAllKeys,
    selectMultipleRow ,
    insertMultipleRow ,
    updateRow
}
