using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Denemeee.Models
{
	[Table("geometry", Schema = "public")]
	public class Geometry
	{
		[Key]
		[StringLength(Int32.MaxValue)]
		public string Geom { get; set; }
		public int id { get; set; }
		public string Surnamew { get; set; }
		public string Datew { get; set; }
		public string Namew { get; set; }
		public string Comments { get; set; }


	}
}
