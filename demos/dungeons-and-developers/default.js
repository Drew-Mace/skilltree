//konami code plugin
(function ($) {

    $.fn.konami = function (callback, code) {
        if (code == undefined) code = "38,38,40,40,37,39,37,39,66,65"; //Super secret!

        return this.each(function () {
            var kkeys = [];
            $(this).keydown(function (e) {
                kkeys.push(e.keyCode);
                if (kkeys.toString().indexOf(code) >= 0) {
                    $(this).unbind('keydown', arguments.callee);
                    callback(e);
                }
            });
        });
    }

})(jQuery);

//Custom closure
(function($, ko, data){

	//IE checks
	function getInternetExplorerVersion() {
	    var rv = -1; // Return value assumes failure.
	    if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent;
	        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        if (re.exec(ua) != null)
	            rv = parseFloat(RegExp.$1);
	    }
	    return rv;
	}
	function isInvalidIEVersion() {
		var ver = getInternetExplorerVersion();
		if (ver > -1 && ver < 9) {
			$('html').addClass("ltIE9");
			return true;
		}
		return false;
	}

	//On page load
	$(function(){

		//Quit if using an IE we don't like
		if (isInvalidIEVersion()) return;

		//Create and bind the viewmodel
		var vm = new tft.skilltree.Calculator(data);
		ko.applyBindings(vm);

		//apply konami code plugin
		$(window).konami(function () { vm.open(); vm.godMode(); });

		//Allow a split second for binding before turning on animated transitions for the UI
		setTimeout(function(){
			$('.page').addClass('animated');
		}, 50);
	});


})(window.jQuery, window.ko, {
	learnTemplate: 'Learn {n} to unlock.',
	portraitPathTemplate: 'img/portraits/portrait-{n}.jpg', 
	numPortraits: 22, 
	defaultStats: {
		'Charisma': 9
		, 'Dexterity': 9
		, 'Fortitude': 9
		, 'Intellect': 9
		, 'Strength': 9
		, 'Wisdom': 9
	},
	skills: [
		{
			id: 1
			, title: 'Marksmen' // markmen 1
			, description: 'Lethal with a wide array of weapon systems.'
			, rankDescriptions: [
				'Riflemans Pack, Medium armor training'
			]
            , 
			 maxPoints: 1
			, stats: [
				{
					title: 'Pistol'
					, value: 2
				}
				,{
					title: 'Rifle'
					, value: 2
				}
				,{
					title: 'SMG'
					, value: 2
				}
				,{
					title: 'DMR'
					, value: 2
				}
			]
		},

		{
			id: 2
			, title: 'Stalker' // stalker 2
			, dependsOn: [1]             
			, maxPoints: 1
			, stats: [
				{
					title: 'Stealth - 1d6 dmg when leaving stealth.'
					, value: 2
				}
				,{
					title: 'Side arm'
					, value: 1
				}
				,{
					title: 'Melee bladed'
					, value: 2/2
				}
			]
            , rankDescriptions: [
                'Stalkers pack\n+3 Evasion while in light armor'                
            ]
            , description: 'The reason they fear the darkness'
		},
		{
			id: 3
			, title: 'LMG Specialist' // LMG 3
			, dependsOn: [1]
			, maxPoints: 7
            , rankDescriptions: [
                '+1 with LMG on cover or prone'
				, '2 shots per turn'
				, '+1/1 with LMG on cover or prone'
				, '3 shots per turn'
				, '+1/1 with LMG on cover or prone'
				, '4 shots per turn'
				, '+1/1 with LMG on cover or prone'
            ]
            , description: 'Brining in the heavy fire power to lay suppresive fire.'			
		},
		{
			id: 4
			, title: 'Assault Rifle Spec' // AR SPEC 4
			, dependsOn: [1]
			, maxPoints: 7
			, rankDescriptions: [
				'+1 attack rolls with rifles'
				,'2 shots per turn'
				,'+1/1 with rifles'
				,'3 shots per turn'
				,'+1/1 with rifles'
				,'4 shots per turn'
				,'+1/1 with rifles'
			]
            , description: 'Getting into the fray.'			
		},
		{
			id: 5
			, title: 'Rail system' // Rail system 5
			, dependsOn: [1]
            , description: 'A Picatinny rail added to a weapon to add 1-2 weapon mods.'
		},

		{
			id: 6
			, title: 'SMG Specialist' // SMG 6
			, dependsOn: [1]
			, maxPoints: 7
			, rankDescriptions: [
				'2 shots per turn'
				,'+1/1 with SMGs'
				,'3 shots per turn'
				,'+1/1 with SMGs'
				,'4 shots per turn'
				,'+1/1 with SMGs'
				,'5 shots per turn'
			]
            , description: 'Up close and personal.'
		},
		{
			id: 7
			, title: 'DMR Specialist' // DMR 7
			, dependsOn: [1]
			, maxPoints: 2
			, rankDescriptions: [
				'+2 attack rolls with DMR'
				,'2 shots per turn'
			]
            , description: 'Danger from a distance.'
		},

		{
			id: 8
			, title: 'Panther Chameleon Suit' // PC SUIT 8
			, dependsOn: [2]
            , description: 'Stealth increased by 2\n2 attack per turn\n+2 movement in stealth\ncannot be detected by IR/NV.'
		},
		{
			id: 9
			, title: 'Assassin 1' // ASS1 9
			, dependsOn: [8]			
            , rankDescriptions: [
                '+1 with side arms'
            ]
            , description: 'Silent Death.'
			, stats: [
				{
					title: 'Athletics'
					, value: 2
				}
				, {
					title: 'Acrobatics'
					, value: 2
				}
			]
		},
		{
			id: 10
			, title: 'Front-end Development Mastery'
			, dependsOn: [9]  
			, stats: [
				{
					title: 'Dexterity'
					, value: 10
				}
			]
		},

		{
			id: 11
			, title: 'Server-side Programming'
			, dependsOn: [1]
            , links: [
                {
                    label: 'Server-side scripting Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Server-side_scripting'
                }
            ]
            , description: 'Developing items (code) that executes on the server (server-side) instead of the user\'s (client\'s) machine.'
			, stats: [
				{
					title: 'Strength'
					, value: 3
				}
			]
		},
		{
			id: 12
			, title: 'Server-side Frameworks'
			, dependsOn: [11]
            , links: [
                {
                    label: 'Comparison of web application frameworks'
                    , url: 'http://en.wikipedia.org/wiki/Comparison_of_web_application_frameworks'
                }
                , {
		            label: 'Web development - server side coding'
                    , url: 'http://en.wikipedia.org/wiki/Web_development#Server_side_coding'
                }
            ]
            , description: 'These are software frameworks and collection of packages or modules that allow developers to write applications or services without having to handle the overhead of common activities and lower level details, such as session management, database access, etc.'
			, stats: [
				{
					title: 'Strength'
					, value: 2
				}
				, {
					title: 'Wisdom'
					, value: 1
				}
			]
			, talents: ['Beefcake']
		},

		{
			id: 13
			, title: 'Database Authoring'
			//, dependsOn: [1]
            , links: [
                {
                    label: 'w3schools.com SQL Tutorial'
	                , url: 'http://www.w3schools.com/sql/'
                }                    
                ,{
		            label: 'SQLZOO Interactive SQL Tutorial'
                    , url: 'http://sqlzoo.net/wiki/'
                }                    
                ,{
                    label: 'Database Normalization Wiki'
                    , url: 'https://en.wikipedia.org/wiki/Database_normalization'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                'You understand how to setup tables.'
                , 'You understand how relational databases organize data.'
            ]
            , description: 'Databases are powerful engines for storing, organizing, and retrieving data.  There is a wide variety of database platforms to choose from.  The most widely used database language is Structured Query Language (SQL).  Properly architecting your data will facilitate your site&rsquo;s server-side programming.'
			, stats: [
				{
					title: 'Strength'
					, value: 3
				}
			]
		},
		{
			id: 14
			, title: 'Advanced DB Management'
			, dependsOn: [13]
            , links: [
                {
                    label: 'Stored Procedure - Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Stored_procedure'
                }
                , {
                    label: 'User-defined function Wiki'
	                , url: 'http://en.wikipedia.org/wiki/User_defined_function'
                }
                , {
                    label: 'Database Tuning Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Database_tuning'
                }
                , {
                    label: 'Performance Monitoring and Tuning How-to Topics (SQL Server)'
                    , url: 'http://technet.microsoft.com/en-us/library/ms187830(v=sql.105).aspx'
                }
                , {
                    label: 'Sql Server Performance Tuning Tips'
                    , url: 'http://www.mssqltips.com/sql-server-tip-category/9/performance-tuning/'
                }
                , {
                    label: 'Oracle database Performance Tuning FAQ'
                    , url: 'http://www.orafaq.com/wiki/Oracle_database_Performance_Tuning_FAQ'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                'You write stored procedures and user-defined functions for more efficient querying.'
                , 'You can detect causes of performance deficiencies and fine tune a database like a rock star.'
            ]
            , description: 'Besides creating basic tables and relating data, databases allow for the creation of stored procedures, sets of SQL statements that are stored in the database, and user-defined functions (UDFs) , functions that can be used in SQL statements.  Just architecting the database is not enough.  The database also needs to be optimized or tuned to increase performance.'
			, stats: [
				{
					title: 'Strength'
					, value: 2
				}
				, {
					title: 'Dexterity'
					, value: 1
				}
			]
			, talents: ['XXL Knapsack']
		},

		{
			id: 15
			, title: 'Server-side Development Mastery'
			, dependsOn: [12, 14]
            , description: 'You are capable of architecting and building an application\'s backend to efficiently store and retrieve data.'
			, stats: [
				{
					title: 'Strength'
					, value: 10
				}
			]
		},
		{
			id: 16
			, title: 'User Authentication and Authorization'
			, dependsOn: [15]
            , links: [
                {
                    label: 'ASP.NET authentication and authorization - CodeProject'
                    , url: 'http://www.codeproject.com/Articles/98950/ASP-NET-authentication-and-authorization'
                }
                ,{
                    label: 'OpenID Wiki (authentication)'
	                , url: 'http://en.wikipedia.org/wiki/OpenID'
                }
                , {
                    label: 'OAuth Community'
                    , url: 'http://oauth.net/'
                }
                , {
                    label: 'ASP.NET Authorization'
                    , url: 'http://msdn.microsoft.com/en-us/library/wce3kxhd(v=vs.100).aspx'
                }
            ]
            , description: 'Authentication is the process determining whether someone or something is who or what it is declared to be. Authorization is the process of determining if a user is allowed to perform an action or has access to a resource.'
			, stats: [
				{
					title: 'Fortitude'
					, value: 5
				}
			]
			, talents: ['Truthseeker']
		},
		{
			id: 17
			, title: 'AJAX & APIs'
			, dependsOn: [10, 15]
            , links: [
                {
                    label: 'AJAX (programming) Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Ajax_(programming)'
                }
                ,{
                    label: 'List of Videos for AJAX'
	                , url: 'http://thenewboston.org/list.php?cat=61'
                }
                ,{
                    label: 'Ajax: The Official Microsoft ASP.NET Site'
	                , url: 'http://www.asp.net/ajax'
                }
                , {
                    label: 'Web Service Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Web_service'
                }
                , {
                    label: 'Representational state transfer (REST) Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Representational_state_transfer'
                }
            ]
            , description: 'Technology exists to allow separate systems to communicate between each other in various ways as well as allowing interfaces to be more intractive.  These include the use of Asynchronous JavaScript and XML (AJAX), usually on the client-side, to communicate with an external system.  Other technologies, such as web services, are used to setup end-points for allowing communication with an external system.'
			, stats: [
				{
					title: 'Strength'
					, value: 1
				}
				,{
					title: 'Dexterity'
					, value: 1
				}
				,{
					title: 'Intellect'
					, value: 1
				}
			]
			, talents: ['Mindweaver']
		},

		{
			id: 18
			, title: 'User Discovery'
			, maxPoints: 2
			, rankDescriptions: [
				'You know the right questions to ask, and use sketches to confirm your ideas.'
				, 'You use advanced techniques like experience mapping to lead conversations with stakeholders.'
			]
            , links: [
             	{ 
             		label: 'The anatomy of an experience map'
             		, url: 'http://www.adaptivepath.com/ideas/the-anatomy-of-an-experience-map'
             	}
            ]
            , description: 'One of the first steps taken before anything is designed is to determine what the client (both the site requestor and the site user) wants and/or needs. Techniques include simple sketching, card-sortting and experience mapping.'
			, stats: [
				{
					title: 'Wisdom'
					, value: 2
				}
				,{
					title: 'Charisma'
					, value: 1
				}
			]
			, talents: ['Mindreader']
		},
		{
			id: 19
			, title: 'Graphic Design'
			, maxPoints: 2
			, rankDescriptions: [
				'You can create a balanced, complementary layout with a clear message.'
				, 'You understand how to create a strikingly unique design, which supports traditional design values as well as your underlying message.'
			]
			, dependsOn: [18]
            , links: [
                {
                    label: 'Graphic Design Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Graphic_design'
                }
                ,{
                    label: 'Behance'
	                , url: 'http://www.behance.net/'
                }
                , {
                    label: 'User experience design Wiki'
                    , url: 'http://en.wikipedia.org/wiki/User_experience_design'
                }
                ,{
                    label: 'Awwwards'
	                , url: 'http://www.awwwards.com/'
                }
            ]
            , description: 'Graphic design is about aesthetics and usability. Good designs are inviting and easy to understand, by solid use of color, typography, balance, hierarchy and white space.'
			, stats: [
				{
					title: 'Charisma'
					, value: 3
				}
			]
			, talents: ['Artistic']
		},
		{
			id: 20
			, title: 'Graphic Design Tools'
			, dependsOn: [19]
            , links: [
                {
                    label: '100 Top Tools for Graphic Designers | Graphic Design Classes'
                    , url: 'http://graphicdesignclasses.net/design-tools/'
                }
            ]
            , description: 'Software such as Photoshop and devices like drawing tablets are used to create layouts, work with type, touch-up photos, and other activities to add professional polish to your designs.'
			, stats: [
				{
					title: 'Charisma'
					, value: 2
				}
				,{
					title: 'Intellect'
					, value: 1
				}
			]
		},
		{
			id: 21
			, title: 'Prototypes'
			, dependsOn: [18]
            , links: [
                {
                    label: 'Design Better And Faster With Rapid Prototyping'
	                , url: 'http://www.smashingmagazine.com/2010/06/16/design-better-faster-with-rapid-prototyping/'
                }
                , {
                    label: '16 Design Tools for Prototyping and Wireframing'
                    , url: 'http://www.sitepoint.com/tools-prototyping-wireframing/'
                }
            ]
            , description: 'Modeling a new design without building all the underlying functionality is a fast and efficient way to convey ideas, test a new concept, and identify problems you didn\'t anticipate.'
			, stats: [
				{
					title: 'Wisdom'
					, value: 1
				}
				,{
					title: 'Intellect'
					, value: 2
				}
			]
			, talents: ['Conjurer']
		},
		{
			id: 22
			, title: 'User Experience Design Mastery'
			, dependsOn: [19, 21]
            , description: 'You are capable of converting project requirements to an attractive design that promotes a pleasant user experience.'
			, stats: [
				{
					title: 'Wisdom'
					, value: 1
				}
				,{
					title: 'Charisma'
					, value: 2
				}
			]
		},
		{
			id: 23
			, title: 'User Testing'
			, dependsOn: [22]
            , links: [
                {
                    label: 'My big list of 24 Web Site Usability Testing Tools'
	                , url: 'http://www.usefulusability.com/24-usability-testing-tools/'
                }
                , {
                    label: 'Usability Testing Wiki'
                    , url: 'http://en.wikipedia.org/wiki/Usability_testing'
                }
            ]
            , description: 'It is a technique, also known as usability testing, that is used to evaluate a website by testing it on users.'
            , stats: [
				{
					title: 'Charisma'
					, value: 1
				}
				,{
					title: 'Wisdom'
					, value: 2
				}
			]
			, talents: ['Alchemist']
		},

		{
			id: 24
			, title: 'Server Administration'
            , links: [
                {
                    label: 'Comparison of web server software Wiki'
	                , url: 'http://en.wikipedia.org/wiki/Comparison_of_web_server_software'
                }
                , {
                    label: 'Apache mod_rewrite - Apache HTTP Server'
                    , url: 'http://httpd.apache.org/docs/2.4/rewrite/'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                'You are capable of setting up your application in a new environment.'
                , 'You are familiar with server-side URL rewriting tools like mod_rewrite.'
            ]
            , description: 'Even the simplest web applications will require a server to run them.  There are several popular and fully-featured web servers to choose from, though your application\'s server-side programming language may limit your options.  Learning to manage and configure your web server will help you keep your site up and running smoothly.'
            , stats: [
				{
					title: 'Fortitude'
					, value: 3
				}
			]
			, talents: ['Stewardship']
		},
		{
			id: 25
			, title: 'Deployment'
			, dependsOn: [24]
            , links: [
                {
                    label: 'SSL Certificate Installation'
	                , url: 'http://www.sslshopper.com/ssl-certificate-installation.html'
                }
                , {
                    label: 'Minimize payload size - Google Developers'
                    , url: 'https://developers.google.com/speed/docs/best-practices/payload'
                }
                , {
                    label: 'Parallelize downloads across hostnames - Google Developers'
                    , url: 'https://developers.google.com/speed/docs/best-practices/rtt#ParallelizeDownloads'
                }
            ]
			, maxPoints: 2
            , rankDescriptions: [
                'You minify your public-facing files and serve compressed files to save bandwidth and improve your site\'s speed.'
                , 'You secure sensitive traffic over HTTPS using an SSL certificate.'
            ]
            , description: 'Before sharing your application with the world, follow the best practices for security and performance on the server.'
            , stats: [
				{
					title: 'Fortitude'
					, value: 2
				}
				,{
					title: 'Dexterity'
					, value: 1
				}
			]
			, talents: ['Spectral Guide']
		},

		{
			id: 26
			, title: 'Web Development Mastery'
			, dependsOn: [4, 7, 10, 15, 22, 25]
            , links: [
                {
                    label: 'Web Development Wiki'
	                , url: 'http://en.wikipedia.org/wiki/Web_development'
                }
            ]
            , description: 'This refers to designing, creating, and maintaining a website.'
			, stats: [
				{
					title: 'Charisma'
					, value: 3
				}
				,{
					title: 'Dexterity'
					, value: 3
				}
				,{
					title: 'Fortitude'
					, value: 3
				}
				,{
					title: 'Intellect'
					, value: 3
				}
				,{
					title: 'Strength'
					, value: 3
				}
				,{
					title: 'Wisdom'
					, value: 3
				}
			]
			, talents: ['Demigod']
		}

	]
});