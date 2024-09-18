using Denemeee.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Denemeee.DataContext
{
	public class GeometryDbContext:DbContext
	{
		public GeometryDbContext() : base(nameOrConnectionString: "Myconnection")
		{

		}
		public virtual DbSet<Geometry> geoCol { get; set; }

	}
}
