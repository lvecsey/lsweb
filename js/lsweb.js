
function lsweb_show_entry(entry) {

    var str = '';

    str += '<TR><TD><a href="' + entry.url + '">' + entry.title + '</a></TD></TR>';
    
    return str;
    
}

function lsweb_draw_table(entries) {

    var n;

    var str = '';

    str += '<TABLE BORDER="0">';

    for (n = 0; n < entries.length; n++) {

	str += lsweb_show_entry(entries[n]);

    }

    str += '</TABLE>';

    return str;

}

