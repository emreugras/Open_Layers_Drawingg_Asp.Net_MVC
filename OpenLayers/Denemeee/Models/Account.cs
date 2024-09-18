using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using System.Data.Entity;


namespace Denemeee.Models
{
	[Table("login", Schema = "public")]
	public class Account
	{
		[Key]
		public string u_name { get; set; }

		public string u_pswd { get; set; }
	}
}