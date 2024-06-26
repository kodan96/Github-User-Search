import { Octokit, App } from "https://esm.sh/octokit"

$(document).ready(() => {
    $('.src-btn').on('click', (e) => {
        e.preventDefault();
        const octokit = new Octokit({
            auth: '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'
        });
        const inputValue = $('#username').val();
        octokit.request(`GET /users/${inputValue}`, {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        .then(({ data }) => {
            $('.username').html(`@${inputValue}`);
            $('.login').html(data.login);
            $('.avatar').attr('src', data.avatar_url);
            $('.joined').html(`Joined ${data.created_at.slice(0, 10)}`);
            $('.bio').html(data.bio);
            $('.followers').html(data.followers);
            $('.following').html(data.following);
            $('.repos').html(data.public_repos);
            
            // Check and update company
            if (data.company) {
                $('.company').html(data.company);
            } else {
                $('.company').html('Not available');
            }
            
            // Check and update twitter username
            if (data.twitter_username) {
                $('.twitter').html(data.twitter_username);
            } else {
                $('.twitter').html('Not available');
            }
            
            // Check and update location
            if (data.location) {
                $('.location').html(data.location);
            } else {
                $('.location').html('Not available');
            }
            
            // Check and update URL
            if (data.blog) {
                $('.url').html(data.blog);
            } else {
                $('.url').html('Not available');
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            $('.error').html('User not found');
        });
    });

    $('.dark').on('click', (e) => {
        $(e.currentTarget).toggle();
        const root = document.documentElement;
    
        root.style.setProperty('--subtxt', '#FEFEFE');
        root.style.setProperty('--logo', '#FEFEFE');
        root.style.setProperty('--sectionbg', '#1E2A47');
        root.style.setProperty('::-webkit-input-placeholder', {'color': '#FEFEFE' });
        root.style.setProperty('--bodybg', '#141D2F');
        $('.light').toggle();
        $('.mode').html('LIGHT')
        
        
        $('#username').css({
            'color': '#FEFEFE'
        });

    })

    $('.light').on('click', (e) => {
        $(e.currentTarget).toggle();
        $('.dark').toggle();
        const root = document.documentElement;
        root.style.setProperty('--subtxt', '');
        root.style.setProperty('--logo', '');
        root.style.setProperty('--sectionbg', '');
        root.style.setProperty('--bodybg', '');
        $('#username').css({
            'color': ''
        });
        $('.mode').html('DARK');
    })
});
