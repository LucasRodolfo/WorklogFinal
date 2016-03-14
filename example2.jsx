
var MyLabel = React.createClass({
   render: function() {
    return <div>{this.props.text}</div>;
  }
});

var MyButton = React.createClass({
  _buttonClicked:  function(e) {
    if (this.props.onClick) {
        this.props.onClick(e)
    }
  },
  render: function() {
    return <button onClick={this._buttonClicked}>{this.props.textlabel}</button>;
  }
});


var MyTextfield = React.createClass({
  getInitialState: function() {
     return {
      data: this.props.name
     };
  },

  _entryChanged: function(e) {
    var val = e.target.value;
    this.setState({data: val});
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  },
  render: function() {
    return <input type='text' onChange={this._entryChanged} placeholder={this.props.name} />;
  }
});

var MySelectfield = React.createClass({
  getInitialState: function() {
     return {
      data: this.props.name
     };
  },

  _entryChanged: function(e) {
    var val = e.target.value;
    this.setState({data: val});
    if (this.props.onChange) {
      this.props.onChange(val);
    }
  },
  render: function() {
    return(
            <select>
                <option value="Run" selected>Run</option>
                <option value="Swimming">Swimming</option>
                <option value="Bike">Bike</option>
                <option value="Studying">Studing</option>
                <option value="Sleeping">Sleeping</option>
              </select>);
  }
});

var ButtonLabel = 'Add';

var MyTableCell = React.createClass({

    _deleteValue: function (e) {
      this.props.remover(e.target.parentElement.id);
      
    },
    render: function () {     
        return (
           <tr id={this.props.id}> 
              <td><input type='text' value={this.props.data['time']}
                 disabled/></td>
              <td><input type='text' value={this.props.data['type']}
                 disabled/></td>
              <td><input type='text' value={this.props.data['date']}
                 disabled/></td>
              <td><button onClick={this._deleteValue}>x</button></td>
            </tr>
            );
    }
});

var Contador = React.createClass({

  render: function(){
    
    console.log(this.props.total);
    return(

      <div>Total: {this.props.total} horas</div>);
    
  }


});

var DynamicList = React.createClass({
  render: function() {
  	var rows =  [];
    if (this.props.rows != 0){
  	  for(var i=0; i < this.props.rows; i++ ) {
  	   	rows.push(<MyTableCell key={'rowdata-' + i} id={i} data={this.props.data[i]} remover={this.props.remover}  />);
  	 }
    }
    return (
      <table>
        <thead>
          <tr>
            <th> Time </th>
            <th> Type </th>
            <th> Data </th>
            <th> Remove </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      );
  }
});

var ListCreator = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
    return {
      data: [],
      rows: 0, total:0
    };
  },
  _okClicked: function(event) {
    var data = this.state.data;
    data.push({
      time: event.target.parentElement.childNodes[1].value, 
      type: event.target.parentElement.childNodes[2].value, 
      date: event.target.parentElement.childNodes[3].value
    });
    var total = parseInt(event.target.parentElement.childNodes[1].value) + parseInt(this.state.total);

    this.setState({data: data});
    this.setState({rows: parseInt(this.state.data.length)});
    this.setState({total: total});
    
  },
  _dataChanged: function(newValue) {
     
  },
  _removeData: function(id) {
    var index = parseInt(id);
    var data = this.state.data;
    
    console.log(id);
    console.log(index);
    console.log(data[0].time);

    var total = parseInt(this.state.total) - parseInt(data[0].time);

    data.splice(index, 1);
    console.log(data);
    this.setState({data: data});
    this.setState({rows: parseInt(this.state.data.length)});
    this.setState({total: total});

    console.log('Aqui1 '+ parseInt(this.state.total));
    console.log(data);
    
    //var total = parseInt(this.state.total) - parseInt(data.parentElement.childNodes[1].value);
    
    console.log('Aqui2 '+  parseInt(this.state.total));

  },
  render: function() {
   return   <div className='containing'> 
              <div className='left-side'>      
               <MyLabel  text='Work' />
               <MyTextfield onChange={this._dataChanged} name='Time' />
               <MySelectfield onChange={this._dataChanged} name='Type' />
               <MyTextfield onChange={this._dataChanged} name='Data: XX/XX/XXXX' />
               <MyButton textlabel={ButtonLabel} onClick={this._okClicked} />
              </div>
              <div className='right-side'>
               <DynamicList rows={this.state.rows} data={this.state.data} remover={this._removeData} />
              </div>
              <div ><Contador  total={this.state.total}/></div>
            </div>;
  }
});


React.render(
   <ListCreator />,
  document.getElementById('container')
);
