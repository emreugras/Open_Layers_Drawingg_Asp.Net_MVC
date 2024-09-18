using Denemeee.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Denemeee.DataContext
{
	public class LoggerDbContext:DbContext
	{
		public LoggerDbContext():base(nameOrConnectionString: "Myconnection")
		{

		}
		public virtual DbSet<LogModel> Log { get; set; }
	}
}