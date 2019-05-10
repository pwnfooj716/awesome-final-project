import React, {Component} from 'react';
import firebaseConfig from '../../config/firebaseConfig';

class SignUp extends Component {
    state ={
        email:'',
        password:'',
        name:''
    }

    signUp = (newUser) => {
      
        firebaseConfig.auth().createUserWithEmailAndPassword(
            newUser.email, 
            newUser.password).then(resp => {
                firebaseConfig.firestore().collection('users').doc(resp.user.uid).set({
                  Email: newUser.email,
                  Name: newUser.name
                });
              }).then(() => {
              console.log("creation success");
              }).catch((err) => {
               console.log(err);
              });;



        
    }

    handleChange = (e) =>{
        this.setState({
        [e.target.id]: e.target.value
    })}
    handleSubmit = (e) =>{
        e.preventDefault();
        this.signUp(this.state);
        console.log(this.state); 

    }

    render(){
        const divStyle = {
            margin: '100px',
            border: '5px solid pink'
          };
        return(
            <div className='container' style={divStyle}>
                <form onSubmit={this.handleSubmit} className='white'> 
                <h5 >Sign Up</h5>
                <div className='input-field'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" id="email" onChange={this.handleChange}/>
                </div>
                <div className='input-field'>
                    <label htmlFor='password'>Password</label>
                    <input type="password" id="password" onChange={this.handleChange}/>
                </div>
                <div className='input-field'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" id="name" onChange={this.handleChange}/>
                </div>
                
                <div className='input-field'>
                    <button className='btn pink lighten-1 z-depth-zero'>SignUp</button>
                </div>
                </form>
            </div>
        )
    }
}

export default SignUp;