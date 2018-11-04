import React, { Component } from 'react';

class Diary extends Component {
          
    constructor (props) {
        super(props)
        this.state = { 
            visible: true 
        }
    }
    
    componentDidMount(){
        this.titleInput.focus();
    }
    
    render() {
        return (
            <div>
                <input
                    ref={(input) => { this.titleInput = input; }}
                    className="text-4xl appearance-none w-full text-grey-darker leading-tight focus:outline-none" 
                    id="title" 
                    type="text" 
                    placeholder="What did you consume?"
                />
                <textarea 
                    rows="5"
                    className="mt-4 bg-grey-lighter rounded-lg appearance-none border-2 border-grey-lighter w-full py-2 px-2 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-teal" 
                    type="text" 
                    placeholder="Describe portions, why you ate, who you were with, ect..."
                />
                <button 
                    className="bg-teal hover:bg-teal-dark text-grey-lightest py-2 px-4 rounded-lg inline-flex items-center mt-4 focus:outline-none">
                     <svg
                            className="w-5 h-5 mr-2" 
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                    <span>
                        Save
                    </span>
                </button>
            </div>
        );
  }
}

export default Diary;
