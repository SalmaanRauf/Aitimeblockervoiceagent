
const supabase = require('../db');

// Display list of all Events.
exports.event_list = async (req, res, next) => {
    const { data, error } = await supabase.from('events').select('*');
    if (error) {
        return next(error);
    }
    res.send(data);
};

// Handle Event create on POST.
exports.event_create_post = async (req, res, next) => {
    const { title, description, startTime, endTime, timeZone } = req.body;
    const { data, error } = await supabase.from('events').insert([
        {
            title: title || 'No title',
            description,
            completed: false,
            show: true,
            startTime,
            endTime,
            timeZone,
        },
    ]);
    if (error) {
        return next(error);
    }
    res.redirect('/');
};

// Handle Event update on POST.
exports.event_update_post = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, completed, show, startTime, endTime, timeZone } = req.body;
    const { data, error } = await supabase
        .from('events')
        .update({ title, description, completed, show, startTime, endTime, timeZone })
        .eq('id', id);
    if (error) {
        return next(error);
    }
    res.redirect('/');
};

// Handle Event delete on POST.
exports.event_delete_post = async (req, res, next) => {
    const { id } = req.params;
    const { data, error } = await supabase.from('events').delete().eq('id', id);
    if (error) {
        return next(error);
    }
    res.redirect('/');
};
