import React from 'react'
import {Image,StyleSheet} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer } from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from '../Components/Search'
import FilmDetails from '../Components/FilmDetails'
import Favorites from '../Components/Favorites'



const SearchStackNavigator = createStackNavigator({
    Search:{
        screen:Search,
        navigationOptions:{
            title:"Recherche"
        }
    },
    FilmDetails:{
        screen:FilmDetails,
        navigationOptions:{
            title:"Details"
        }
    }
})

const FavoriteStackNavigator = createStackNavigator({
    Favorites:{
        screen:Favorites,
        navigationOptions:{
            title:"Favoris"
        }
    },
    FilmDetails:{
        screen:FilmDetails,
        navigationOptions:{
            title:"Details"
        }
    }
})

const FilmTabNavigator = createBottomTabNavigator({
    Search:{
        screen:SearchStackNavigator,
        navigationOptions:{
            tabBarIcon:()=>{
                return <Image
                   source={require('../Images/search.png')}
                   style={styles.icon}/>
            }
        }
    },
    Favorites:{
        screen:FavoriteStackNavigator,
        navigationOptions:{
            tabBarIcon:()=>{
                return <Image
                   source={require('../Images/heart.png')}
                   style={styles.icon}/>
            }
        }
    }
    },{
        tabBarOptions:{
            activeBackgroundColor:'#DDDDDD',
            inactiveBackgroundColor:'#FFFFFF',
            showLabel:false,
            showIcon:true
        }
})

const styles = StyleSheet.create({
    icon:{
        width:30,
        height:30
    }
})

export default createAppContainer(FilmTabNavigator)
