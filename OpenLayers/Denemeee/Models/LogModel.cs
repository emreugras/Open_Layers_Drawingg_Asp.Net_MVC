using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Denemeee.Models
{
	[Table("logger", Schema = "public")]
	public class LogModel
	{
		[Key]
		public int ides { get; set; }
		public string user_ { get; set; }
		public string date { get; set; }
		public string logmessage { get; set; }
		public string yeniKayıt { get; set; }
		public string güncellenenKayıt { get; set; }
		public string silinenKayıt { get; set; }
	}
}