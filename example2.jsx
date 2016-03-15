


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
      var id = e.target.parentElement.parentElement.id;
      this.props.remover(id);
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
      <table className="table-borda">
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
    var time = event.target.parentElement.childNodes[1].value;
    var type = event.target.parentElement.childNodes[2].value;
    var date = event.target.parentElement.childNodes[3].value;

    if (time == '' || type == '' || date == '') {
      alert('Algum campo vazio!');
    } else { 
      data.push({
        time: time, 
        type: type, 
        date: date
      });
      var total = parseInt(time) + parseInt(this.state.total);

      this.setState({data: data});
      this.setState({rows: parseInt(this.state.data.length)});
      this.setState({total: total});
    }
  },
  _dataChanged: function(newValue) {
     
  },
  _removeData: function(id) {
    var index = parseInt(id);
    var data = this.state.data;
    var total = this.state.total - parseInt(data[index].time);
    data.splice(index, 1);

    this.setState({data: data});
    this.setState({rows: parseInt(this.state.data.length)});
    this.setState({total: total});
    
    //var total = parseInt(this.state.total) - parseInt(data.parentElement.childNodes[1].value);
    
  },
  render: function() {
   return   <div className='containing'>
              <div className='left-side-parent'> 
                <div className='left-side'>      
                 <MyLabel text='' />
                 <MyTextfield onChange={this._dataChanged} name='Time' />
                 <MySelectfield onChange={this._dataChanged} name='Type' />
                 <MyTextfield onChange={this._dataChanged} name='Data: XX/XX/XXXX' />
                 <MyButton textlabel={ButtonLabel} onClick={this._okClicked} />
                </div>
              </div>
              <div className='right-side-parent'>
                <div className='right-side'>
                 <DynamicList rows={this.state.rows} data={this.state.data} remover={this._removeData} />
                </div>
              </div>
              <div className='total-fixed'><Contador  total={this.state.total}/></div>
            </div>;
  }
});


React.render(
   <ListCreator />,
  document.getElementById('container')
);
