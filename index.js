const LoadXML = (function () {
    // Time Array to store 5 days of week
    const timetable_time = new Array(13).fill().map(() => new Array().fill([]));

    // Seal data and insert into table 
    const GenerateTable = () => {
        const day_time = [
            800,
            900,
            1000,
            1100,
            1200,
            1300,
            1400,
            1500,
            1600,
            1700,
            1800,
            1900,
            2000,
        ];

        // Prepare basic table structure
        let table =
            '<table style="width: 100%; border-collapse: collapse;"><tr><td>#</td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td></tr>';
        // ----------------------------------------------------------------------------------------------------------------------------------------------------------------

        // Perform table generation
        for (let c = 0; c < timetable_time.length; c++) {
            let row = `<tr><td>${day_time[c]}</td><td>`;
            const current_time = timetable_time[c];
            const place_days = new Array(5).fill('-');

            if (current_time.length > 0) {
                for (let d = 0; d < current_time.length; d++) {
                    place_days[['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(current_time[0]['day'])] = `<p>${current_time[d]['course_code']}</p><p>${current_time[d]['room_number']}</p>`;
                }
            };

            const output = place_days.join('</td><td>');
            row += output + '</td></tr>';
            table += row;
        }

        // Insert into div
        table += '</table>';

        document.getElementById('table-info').innerHTML = table;
        // --------------------------------------------------------------------
    }

    // Sort classes according to their time
    const SortTime = (school_class, day) => {
        const class_time = school_class
            .getElementsByTagName('time')[0]
            .attributes.getNamedItem('start').nodeValue;

        // Prepare text to insert into time array
        const course_code_and_room_number_day = {
            day,
            course_code: school_class.attributes.getNamedItem('course-code')
                .nodeValue,
            room_number: school_class.attributes.getNamedItem('room-number')
                .nodeValue,
        };
        // --------------------------------------------------------------------

        // Check for class time for student to instert into time array
        switch (class_time) {
            case '800':
                timetable_time[0].push(course_code_and_room_number_day);
                break;
            case '900':
                timetable_time[1].push(course_code_and_room_number_day);
                break;
            case '1000':
                timetable_time[2].push(course_code_and_room_number_day);
                break;
            case '1100':
                timetable_time[3].push(course_code_and_room_number_day);
                break;
            case '1200':
                timetable_time[4].push(course_code_and_room_number_day);
                break;
            case '1300':
                timetable_time[5].push(course_code_and_room_number_day);
                break;
            case '1400':
                timetable_time[6].push(course_code_and_room_number_day);
                break;
            case '1500':
                timetable_time[7].push(course_code_and_room_number_day);
                break;
            case '1600':
                timetable_time[8].push(course_code_and_room_number_day);
                break;
            case '1700':
                timetable_time[9].push(course_code_and_room_number_day);
                break;
            case '1800':
                timetable_time[10].push(course_code_and_room_number_day);
                break;
            case '1900':
                timetable_time[11].push(course_code_and_room_number_day);
                break;
            case '2000':
                timetable_time[12].push(course_code_and_room_number_day);
                break;
        }
    };

    // Sort dates and display table
    const DisplayTimetable = (xml) => {
        try {
            // Get ref
            const GetFirstChildValue = (id) =>
                xml.getElementsByTagName(id)[0].childNodes[0].nodeValue;
            const student_name = document.getElementById('name');
            const student_number = document.getElementById('student-number');
            const school_name = document.getElementById('name-of-school');
            const study_program = document.getElementById('program-of-study');
            const school_term = document.getElementById('school-term');
            // --------------------------------------------------------------------

            // Display info about the student
            student_name.innerHTML = GetFirstChildValue('name');
            student_number.innerHTML = GetFirstChildValue('id-number');
            school_name.innerHTML = GetFirstChildValue('program-of-study');
            study_program.innerHTML = GetFirstChildValue('name-of-school');
            school_term.innerHTML = GetFirstChildValue('school-term');
            // -------------------------------------------------------------

            // Perform look up day by day
            const days = xml.getElementsByTagName('day');

            for (let a = 0; a < days.length; a++) {
                const classes = days[a].getElementsByTagName('class');
                for (let b = 0; b < classes.length; b++) {
                    // Call to sort classes into time categories, providing class XML element and day attribute (Monday, Tuesday, etc.)
                    SortTime(classes[b], days[a].attributes.getNamedItem('name').nodeValue);
                }
            }

            // -------------------------------------------------------------------------------------

            // Generate table with retrieved data
            GenerateTable();
            // -------------------------
        } catch (err) {
            document.getElementById('table-info').innerHTML = 'Cannot load your timetable!';
        }
    };

    // Perform request to student
    const xml_http = new XMLHttpRequest();

    xml_http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Call function for response-processing
            DisplayTimetable(this.responseXML);
        }
    };

    xml_http.open('GET', 'student-2.xml', true); // XML Files: student-1.xml / student-1.xml = valid ones; student-3.xml - unvalid.
    xml_http.setRequestHeader('Content-Type', 'text/xml');
    xml_http.send(null);

    // ----------------------------------------------------------
})();