import * as React from "react";
import {Text,View} from "react-native";
import db from "../config";
import firebase from "firebase";

export default class MyDonationsScreen extends React.Component{

    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            allDonations:[],
            
        }
        this.requestRef=null
    }

    getAllDonations=()=>{
        this.requestRef=db.collection("all_donations").where("emailId","==",this.state.userId).onSnapshot(
            snapshot=>{
                var allDonations=snapshot.docs.map(document=>document.data)
                this.setState({
                    allDonations:allDonations
                })
            }
        )
    }

    render(){}
}