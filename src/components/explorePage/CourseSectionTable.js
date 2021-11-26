import React from "react";

class CourseSectionTable extends React.Component {
  constructor({courseSections}) {
    super();
    this.courseSections = courseSections;
  }

  render() {
    return (
      <div>
        {
          this.courseSections.map(function(item) {
          return  <ul>
                    <li key={item.courseCRN}>{item.courseCRN}</li>
                  </ul>
          })
        }
      </div> 
    );
  }
}

export default CourseSectionTable;